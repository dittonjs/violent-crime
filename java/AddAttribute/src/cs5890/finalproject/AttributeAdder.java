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

public class AttributeAdder {
	private String newHeader;
	private String newData;
	
	public AttributeAdder(String newHeader, String newData) {
		setAdder(newHeader, newData);
	}
	
	public void setAdder(String newHeader, String newData) {
		this.newHeader = newHeader + ",";
		this.newData = newData + ",";
	}
	
	public void add(File file) throws IOException {
		System.out.println(file.getCanonicalPath());
		File tmpFile = getTempFile();
		addIntoTmp(file, tmpFile);
		copyFile(tmpFile, file);
		tmpFile.delete();
	}
	
	private void addIntoTmp(File file, File tmp) throws IOException {
		BufferedReader in = new BufferedReader(new FileReader(file));
		PrintWriter out = new PrintWriter(tmp);
		
		boolean isHeader = true;
		String inLine = in.readLine(); 
		while (inLine != null) {
			String newLine = (isHeader ? newHeader : newData) + inLine;
			isHeader = false;
			printToOut(newLine, out);
			
			inLine = in.readLine();
		}

		in.close();
		out.flush();
		out.close();
	}
	
	private void printToOut(String line, PrintWriter out) {
		out.println(line);
	}
	
	private File getTempFile() {
		return new File("Adder.tmp");
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
