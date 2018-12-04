package cs5890.finalproject;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

public class ConsoleUI {
	public static void main(String[] args) throws IOException {
		if (args.length == 0) return;
		
		DataSanitizer sanitizer = new DataSanitizer();
		PrintWriter auxOut = new PrintWriter(new File("ScrapedInfo.txt"));
		PrintWriter auxOut2 = new PrintWriter(new File("AllTables.txt"));
		
		List<File> selectedFiles = getSelectedFiles(args);
		List<File> dataFiles = getDataFilesFromList(selectedFiles);
		for (File file : dataFiles) {
			sanitizer.sanitize(file, auxOut, auxOut2);
		}
		
		auxOut.flush();
		auxOut.close();
		auxOut2.flush();
		auxOut2.close();
	}
	
	private static List<File> getSelectedFiles(String[] filenames) {
		List<File> selectedFiles = new ArrayList<File>();
		for (String filename : filenames) {
			File selectedFile = null;
			
			try {
				selectedFile = new File(filename);
				if (!selectedFiles.contains(selectedFile))
					selectedFiles.add(selectedFile);
			} catch (NullPointerException npe) { /*skip null filenames*/ }
		}
		return selectedFiles;
	}
	
	private static List<File> getDataFilesFromList(List<File> selectedFiles) {
		List<File> dataFiles = new ArrayList<File>();
		
		for (File selectedFile : selectedFiles) {
			if (!selectedFile.exists()) continue;
			
			if (selectedFile.isDirectory())
				dataFiles.addAll(getDataFilesFromDirectory(selectedFile));
			else if (selectedFile.isFile() && isDataFile(selectedFile))
				dataFiles.add(selectedFile);
		}
		
		return dataFiles;
	}
	
	private static List<File> getDataFilesFromDirectory(File dir) {
		List<File> dataFiles = new ArrayList<File>();
		
		for (File childFile : dir.listFiles()) {
			if (childFile.isDirectory())
				dataFiles.addAll(getDataFilesFromDirectory(childFile));
			else if (childFile.isFile() && isDataFile(childFile))
				dataFiles.add(childFile);
		}
		
		return dataFiles;
	}
	
	private static boolean isDataFile(File file) {
		return file.getName().substring(file.getName().lastIndexOf('.') + 1).equals("csv");
	}
}
