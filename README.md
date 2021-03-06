WHAT IS IT?
===========
This is a **jQuery Mobile** web site using **knockoutjs** framework for data
binding, ready to be used with **Phonegap 3.0**.

![screenshot](/screenshot.png "jqm-ko-phonegap screenshot")

TRY IT YOURSELF
===============
Clone the repository

    git clone https://github.com/jeremija/jqm-ko-phonegap.git
    cd jqm-ko-phonegap

To run it in a web browser you must run a simple web server. If you have
python installed, run the following command in root folder of the project: 

    python -m SimpleHTTPServer

Then navigate to `http://localhost:8000/www/index.html` in your browser.

You might also want to uncomment the

    <script>
        $(document).trigger('deviceready');
    </script>

part in `www/index.html` which fakes the Phonegap's `deviceready` event.

RUNNING TESTS
=============
This project uses **mochajs** testing framework for unit tests.

Go to the root folder of the project and execute `scripts/run-tests.sh`. The
prerequisites for running tests in the console are **JSHint** and
**mocha-phantomjs**. You can install those packages with the following command:

    npm install jshint mocha-phantomjs 

Alternatively, you can open the `test/index.html` file in a browser and mocha 
tests will be run automatically.
