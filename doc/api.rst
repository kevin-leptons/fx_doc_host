.. _api:

APIs
****

start
=====

.. code-block:: bash

    fx-doc-host start CONFIG_FILE [OPTIONS]

Description
-----------

* Create directory "tmp" in current working directory.
* If repository did not clone then clone it.
* If repository is cloned then pull changes from remote.
* Build and serve document for each repositories in variou ports.
* Start a master site which contains links to documents.

Arguments
---------

* CONFIG_FILE - Path to configuration file. See :ref:`config_file`.

Options
-------

* ``--no-update``, default is false. If specific true then do not update
  changes from remote repository.
* ``--no-build``, default is false. If specific true then do not build
  documents.
* ``--tmp``, default is current working directory. It is directory where
  repositories and documents files is store.
* ``--port``, default is value of configuration file. Override listen port
  of master site.

Example
-------

.. code-block:: bash

    fx-doc-host start config.yaml --no-update
