from flask.cli import AppGroup
from .users import seed_users, undo_users
from .locations import seed_locations, undo_locations
from .travels import seed_travels, undo_travels
from .seals import seed_seals, undo_seals
from .articles import seed_articles, undo_articles

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_locations()
    seed_travels()
    seed_seals()
    seed_articles()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_locations()
    undo_travels()
    undo_seals()
    undo_articles()
    # Add other undo functions here
