# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_techtalk-js-organization_session',
  :secret      => '4c1201011c47be0617cd34efed00edad9a52605785786afd1ad8b8dd01264e0451ee8b2dc2e382aae5038a476f3da9a75f0ba0a523ace67ed9379db4eeac1683'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
