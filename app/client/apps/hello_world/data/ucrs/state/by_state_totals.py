#!/usr/bin/env python3
import csv
import sys


with open(sys.argv[2], 'w', newline='') as outfile:
  writer = csv.writer(outfile, delimiter=',',
                            quotechar='|', quoting=csv.QUOTE_MINIMAL)
  with open(sys.argv[1], newline='') as csvfile:
      reader = csv.reader(csvfile, delimiter=',', quotechar='|')
      a = [] 
      header = next(reader)
      id_index = header.index('StateID')
      index = header.index('ViolentCrimeRate')
      for row in reader:
        state = row[id_index]
        a.append(float(row[index]))  
      avg = sum(a) / len(a)

      writer.writerow(['StateID', 'ViolentCrimeRate'])
      writer.writerow([state, avg])


#with open(sys.argv[1], 'w', newline='') as csvfile:
#    spamwriter =     spamwriter.writerow(['Spam'] * 5 + ['Baked Beans'])
#    spamwriter.writerow(['Spam', 'Lovely Spam', 'Wonderful Spam'])


