for f in by_state/*; do
  echo $f
  ./by_state_totals.py $f by_state_totals/$f
    # do some stuff here with "$f"
    # remember to quote it or spaces may misbehave
done
