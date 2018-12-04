package cs5890.finalproject;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

public class ConsoleUI {
	static String addingHeader;
	static boolean isStaticAdder;
	static AttributeAdder adder;
	
	public static void main(String[] args) throws IOException {
		if (args.length < 3) return;
		addingHeader = args[1];
		isStaticAdder = !args[2].equals("-d");
		
		adder = new AttributeAdder(addingHeader, args[2]);
		
		List<File> selectedFiles = getSelectedFiles(args[0]);
		List<File> dataFiles = getDataFilesFromList(selectedFiles);
		for (File file : dataFiles) {
			updateAdder(file);
			adder.add(file);
		}
	}
	
	private static void updateAdder(File file) {
		if (isStaticAdder) return;
		String newData = file.getName().substring(0, file.getName().indexOf('.'));
		adder.setAdder(addingHeader, newData);
	}
	
	private static List<File> getSelectedFiles(String filename) {
		List<File> selectedFiles = new ArrayList<File>();
		File selectedFile = null;
		
		try {
			selectedFile = new File(filename);
			selectedFiles.add(selectedFile);
		} catch (NullPointerException npe) { /*skip null filenames*/ }
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
