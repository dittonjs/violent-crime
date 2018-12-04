import sys
import csv

# python name_conversion.py file_with_codes codes_and_names

with open(sys.argv[1], 'rb') as f:
  with open(sys.argv[2], 'rb') as names:
    reader = csv.reader(f)
    ofile  = open('data.csv', "wb")
    name_reader = csv.reader(names)

    writer = csv.writer(ofile, delimiter=',', quotechar='"', quoting=csv.QUOTE_ALL)
  
    name_map = {}
    next(name_reader)
    for row in name_reader:
        code = row[0]
        name = row[1]
        name_map[code] = name
 
    next(reader)
    for row in reader:
      code = row[0]
      row[0] = name_map[code]
      print row
      writer.writerow(row)
