#!/bin/bash

BASE_PATH="."
APP_FOLDER="$BASE_PATH/www/js/app"
TEST_CONFIG="$BASE_PATH/test/js/config"
TEST_FOLDER="$BASE_PATH/test/js/tests"

echo running jshint javascript validation...
jshint $APP_FOLDER $TEST_CONFIG $TEST_FOLDER
CODE=$?
echo jshint done!
exit $CODE
