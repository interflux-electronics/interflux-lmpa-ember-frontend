#!/usr/bin/env fish

echo "----------"
echo "GENERATE BENCHMARK REPORTS"

set date (date +%F)
set domain https://lmpa.interflux.com
set locale en
set page1 low-melting-point-alloys
set page2 low-melting-point-soldering-alloys
set page3 fast-selective-soldering-with-zero-defects
set page4 drastically-reduce-solder-voiding
set page5 reduce-production-costs-and-increase-capacity
set page6 avoid-heat-related-solder-failures
set page7 reduce-dross-formation-when-wave-soldering
set page8 excellent-wetting
set page9 developed-by-interflux-electronics
set page10 request-free-demo

echo "mkdir -p ./lighthouse/$date/"
mkdir -p ./lighthouse/$date/

for page in $page1 $page2 $page3 $page4 $page5 $page6 $page7 $page8 $page9 $page10;
  echo "----------"
  echo "lighthouse $domain/$locale/$page --output-path ./lighthouse/$date/$page --output json --output html --chrome-flags="--headless"";
  lighthouse $domain/$locale/$page --output-path ./lighthouse/$date/$page --output json --output html --chrome-flags="--headless";
end

echo "----------"
