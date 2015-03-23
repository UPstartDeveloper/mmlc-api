/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the development       *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

  models: {
     connection: 'localMongodbServer'
  },

  transport: {
    service: 'SendGrid',
    auth: {
        user: "azure_5cc610f36835d94433a8b5d5c49179d9@azure.com",
        pass: "RCJvxe5E8s1WUc0"
    }
  }

};
