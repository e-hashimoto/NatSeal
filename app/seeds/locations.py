from app.models import db, Location


# Adds a demo user, you can add other users here if you want
def seed_locations():
    antarctica = Location(
        user_id=1, latitude=82.8628, longitude=135.0000, description="", image_url=''
    )

    db.session.add()

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
