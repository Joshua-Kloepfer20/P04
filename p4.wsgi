#!/usr/bin/python3

import sys
import logging
logging.basicConfig(stream=sys.stderr)
sys.path.insert(0,"/var/www/p4/")

from p4 import app as application
application.secret_key = 'heehee'