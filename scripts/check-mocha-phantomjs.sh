#!/bin/bash
echo running mocha-phantomjs...
mocha-phantomjs test/index.html
CODE=$?
echo done!
exit $CODE
