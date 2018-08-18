.. _config_file:

Configuration File
******************

.. table::

    =================== =========== =========== ===============================
    Attribute           Type        Default     Description
    =================== =========== =========== ===============================
    title               string                  Title of hosting
    port                number      8080        Master site port
    auth                object                  Authentication credentials
    auth.user           string                  Username
    auth.password       string                  Password
    org                 object                  Organization information
    org.name            string                  Name of organization
    org.url             string                  URL to organization home site
    sites               array                   List of documents
    sites[i].url        string                  URL to git repository
    sites[i].branch     string      'branch'    Branch to clone
    sites[i].doc        string      'doc'       Relative path to fx document
                                                directory in repository
    =================== =========== =========== ===============================
