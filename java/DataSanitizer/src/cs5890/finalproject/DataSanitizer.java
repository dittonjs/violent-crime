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

public class DataSanitizer {
	private boolean hasHeader;
//   ../../data/ucrs
	public void sanitize(File file, PrintWriter auxOut, PrintWriter auxOut2) throws IOException {
		System.out.println(file.getCanonicalPath());
		File tmpFile = getTempFile();
		sanitizeIntoTmp(file, auxOut, tmpFile, auxOut2);
		copyFile(tmpFile, file);
		tmpFile.delete();
	}
	
	private void sanitizeIntoTmp(File file, PrintWriter auxOut, File tmp, PrintWriter auxOut2) throws IOException {
		String filenameLine = "##################### " + file.getCanonicalPath() + " #################";
		auxOut.println(filenameLine);
		auxOut2.println(filenameLine);
		
		int dataColCount = maxColCount(file);
		auxOut.println("##################### Data Columns: " + dataColCount + ", Header Columns: " + (dataColCount+1) + " #################");
		
		BufferedReader in = new BufferedReader(new FileReader(file));
		PrintWriter out = new PrintWriter(tmp);
		boolean headerSeen = false;
		String inLine = in.readLine();
		while (inLine != null) {
			//trailing empty strings are truncated; force non-truncation
			String[] cells = (inLine+"#").split(",");
			if (isExceptionText(inLine) || cells.length < dataColCount) {
				auxOut.println(inLine);
			} else if (cells.length > dataColCount) {
				headerSeen = true;
				printToOut(sanitizeHeader(inLine), out, auxOut2);
			} else if (!hasHeader || headerSeen) {
				printToOut(sanitize(inLine), out, auxOut2);
			} else {
				auxOut.println(inLine);
			}
			
			inLine = in.readLine();
		}

		in.close();
		out.flush();
		out.close();
	}
	
	private String sanitize(String line) {
		//remove footnotes
		line = line.replaceAll(" /\\d+", "");
		
		//trailing empty strings are truncated
		String[] words = (line+"#").split("[ -]");
		
		//remove spaces and capitalize the first letter of each word
		String cleanLine = "";
		for (String word : words) {
			if (word.length() > 0)
				cleanLine += Character.toUpperCase(word.charAt(0));
			if (word.length() > 1)
				cleanLine += word.substring(1, word.length());
		}
		
		return cleanLine.replaceAll("#","");
	}
	
	private String sanitizeHeader(String line) {
		//headers have an extra comma at the end of line
		line = line.substring(0, line.length()-1);
		
		return sanitize(line);
	}
	
	private void printToOut(String line, PrintWriter out, PrintWriter auxOut2) {
		out.println(line);
		auxOut2.println(line);
	}
	
	private File getTempFile() {
		return new File("DataSanitizer.tmp");
	}
	
	private int maxColCount(File file) throws IOException {
		BufferedReader in = new BufferedReader(new FileReader(file));
		
		int secondMax = 0;
		int maxCol = 0;
		
		String inLine = in.readLine();
		while(inLine != null) {
			if (isExceptionText(inLine)) {
				inLine = in.readLine();
				continue;
			}
			
			//trailing empty strings are truncated
			String[] cells = (inLine+"#").split(",");
			if (cells.length > maxCol)  {
				secondMax = maxCol;
				maxCol = cells.length;
			} else if (cells.length > secondMax) {
				secondMax = cells.length;
			}
			
			inLine = in.readLine();
		}
		in.close();
		
		//Headers sometimes have an additional column
		hasHeader = maxCol-secondMax == 1;
		return (hasHeader) ? secondMax : maxCol;
	}
	
	private boolean isExceptionText(String line) {
		return line.contains("Violent crime,") ||
				line.contains("reported") ||
				line.contains("state crime,");
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
