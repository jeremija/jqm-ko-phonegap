#!/bin/bash

function check_return_code {
  CODE=$?
  echo return code was: $CODE
  if [ $CODE -gt 0 ]; then
    echo exiting!
    exit $CODE
  fi
}

scripts/check-jshint.sh
check_return_code

scripts/check-mocha-phantomjs.sh
check_return_code

echo all tests finished successfully!
exit 0
