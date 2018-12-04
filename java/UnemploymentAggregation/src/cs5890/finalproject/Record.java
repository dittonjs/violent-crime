package cs5890.finalproject;

import java.text.DecimalFormat;

public class Record {
	public String state;
	public int year;
	private double valueSum;
	private double valueCount;
	
	public Record(String state, int year, double value) {
		this.state = state;
		this.year = year;
		valueSum = value;
		valueCount = 1;
	}
	
	public void addValue(double value) {
		valueSum += value;
		valueCount++;
	}
	
	public double getValue() {
		return valueSum / valueCount;
	}
	
	public String toString() {
		DecimalFormat df = new DecimalFormat("#0.0000");
		return state + "," + year + "," + df.format(getValue());
	}
}
