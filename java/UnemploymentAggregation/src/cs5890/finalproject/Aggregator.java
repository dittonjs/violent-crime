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

public class Aggregator {
	List<Record> records;
	
	public Aggregator() {
		records = new ArrayList<Record>();
	}
	
	private void addRecord(String state, int year, double value) {
		for (Record record : records) {
			if (record.state.equals(state) && record.year == year) {
				record.addValue(value);
				return;
			}
		}
		
		records.add(new Record(state, year, value));
	}
	
	public void aggregate(File file) throws IOException {
		System.out.println(file.getCanonicalPath());
		generateRecords(file);
		File tmpFile = getTempFile();
		aggregateIntoTmp(tmpFile);
		copyFile(tmpFile, file);
		tmpFile.delete();
	}
	
	private void generateRecords(File file) throws IOException {
		BufferedReader in = new BufferedReader(new FileReader(file));
		
		String inLine = in.readLine(); //skip header
		inLine = in.readLine();
		
		while (inLine != null) {
			String[] cells = inLine.split(",");
			if (cells.length > 4) 
				addRecord(cells[0], Integer.parseInt(cells[1]), Double.parseDouble(cells[4]));
			
			inLine = in.readLine();
		}

		in.close();
	}
	
	private void aggregateIntoTmp(File tmp) throws IOException {
		PrintWriter out = new PrintWriter(tmp);
		printToOut("StateID,Year,Avg", out);
		for (Record record : records) {
			printToOut(record.toString(), out);
		}

		out.flush();
		out.close();
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
