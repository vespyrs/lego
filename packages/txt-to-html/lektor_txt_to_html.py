# -*- coding: utf-8 -*-
#pylint: disable=wrong-import-position
import sys

PY3 = sys.version_info > (3,)

from lektor.pluginsystem import Plugin

from urllib import request


class TxtToHtmlPlugin(Plugin):
    name = u'TXT to Markdown'
    description = u'Lektor plugin to add a remote TXT doc into HTML.'


    def on_setup_env(self, **extra):

        def text(url=None):
            webFile = request.urlopen(url)
            content = webFile.read()
            text ="<pre>" + content + "</pre>"

            return text

        self.env.jinja_env.globals['render_text'] = text
