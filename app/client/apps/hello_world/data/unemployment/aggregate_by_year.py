import sys
import csv

# python name_conversion.py file_with_codes codes_and_names

with open(sys.argv[1], 'rb') as f:
  reader = csv.reader(f)
  ofile  = open('aggregate_by_year.csv', "wb")
  name_reader = csv.reader(f)
  writer = csv.writer(ofile, delimiter=',', quotechar='"', quoting=csv.QUOTE_ALL)
   
  next(reader)
  for row in reader:
    import pdb; pdb.set_trace()
    #code = row[0]
    #row[0] = name_map[code]
    print row
    #writer.writerow(row)
