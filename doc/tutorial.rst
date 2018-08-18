Tutorial
********

Install
=======

Install pre required packages.

* Node.js_.
* fx_doc_, latest version as possible.
* git_, then setup SSH key to access document repositories.

Install fx_doc_host via npm.

.. code-block:: bash

    npm install -g fx_doc_host

Write Configuration File
========================

There are simple configuration file. For more detail, see :ref:`config_file`.

.. literalinclude:: example/config.yaml
    :language: yaml
    :caption: config.yaml

Start hosting
=============

This command start hosting document. For detail, see :ref:`api`.

.. code-block:: bash

    fx-doc-hosting start config.yaml

.. _Node.js: https://nodejs.org/en/
.. _fx_doc: https://pypi.org/project/fx-doc/
.. _git: https://git-scm.com/
