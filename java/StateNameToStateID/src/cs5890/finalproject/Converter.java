package cs5890.finalproject;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

public class Converter {
	private List<String> toConvert;
	private List<String> convertTo;
	
	public Converter() {
		toConvert = new ArrayList<String>();
		convertTo = new ArrayList<String>();
	}
	
	public void addConversion(String from, String to) {
		toConvert.add(from);
		convertTo.add(to);
	}
	
	public void loadConversionCsv(File csv) throws IOException {
		BufferedReader in = new BufferedReader(new FileReader(csv));
		
		String inLine = in.readLine();
		while (inLine != null) {
			String[] conversion = inLine.split(",");
			if (conversion.length < 2)
				continue;
			
			addConversion(conversion[0], conversion[1]);
			
			inLine = in.readLine();
		}
		
		in.close();
	}
	
	public void convert(File file) throws IOException {
		System.out.println(file.getCanonicalPath());
		File tmpFile = getTempFile();
		convertIntoTmp(file, tmpFile);
		copyFile(tmpFile, file);
		tmpFile.delete();
	}
	
	private void convertIntoTmp(File file, File tmp) throws IOException {
		BufferedReader in = new BufferedReader(new FileReader(file));
		PrintWriter out = new PrintWriter(tmp);
		String inLine = in.readLine();
		while (inLine != null) {
			printToOut(convert(inLine), out);
			
			inLine = in.readLine();
		}

		in.close();
		out.flush();
		out.close();
	}
	
	private String convert(String line) {
		//replace all from list
		for (int i = 0; i < toConvert.size(); i++) {
			line = line.replaceAll(toConvert.get(i), convertTo.get(i));
		}
		
		return line;
	}
	
	private void printToOut(String line, PrintWriter out) {
		out.println(line);
	}
	
	private File getTempFile() {
		return new File("Converter.tmp");
	}
	
	/*
	 * Copied from https://www.journaldev.com/861/java-copy-file
	 */
	private void copyFile(File source, File dest) throws IOException {
	    InputStream is = null;
	    OutputStream os = null;
	    try {
	        is = new FileInputStream(source);
	        os = new FileOutputStream(dest);
	        byte[] buffer = new byte[1024];
	        int length;
	        while ((length = is.read(buffer)) > 0) {
	            os.write(buffer, 0, length);
	        }
	    } finally {
	        is.close();
	        os.close();
	    }
	}
}
