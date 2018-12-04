package cs5890.finalproject;

import java.text.DecimalFormat;

public class Record {
	public String state;
	public String year;
	public String value;
	
	public Record(String state, String year, String value) {
		this.state = state;
		this.year = year;
		this.value = value;
	}
	
	public String toString() {
		return state + "," + year + "," + value;
	}
}
