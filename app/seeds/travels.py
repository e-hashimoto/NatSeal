from app.models import db, Travel


def seed_travels():
    idlm = Travel(
        user_id=1, location_id=2, name="Iles de la Madeleine", description='A unique experience: Harp seals come around the islands to give birth. Go and meet them will change your life. Every year at the beginning of March, hundreds of thousands of Harp Seals come to the ice floes around the Islands when it is time for the birth of their young, which are called "whitecoats". The sight of this immense herd spread out over the endless fields of ice and snow is truly awe-inspiring. Discover the Islands in their winter garb.', image_url='https://www.tourismeilesdelamadeleine.com/fichiersUpload/tinymce/20150115093754-20131024085333-pnb022-r-a-karpan-2.jpg'
    )
    antarctica = Travel(
        user_id=1, location_id=1, name="Classic Antarctic Route", description="Pléneau & Petermann Islands – If the ice allows it, you could sail through the Lemaire Channel in search of Adélie penguins and blue-eyed shags. There is also a possibility you’ll encounter humpback and minke whales here, as well as leopard seals.", image_url='https://storage.googleapis.com/oceanwide_web/media-dynamic/cache/widen_1600/media/default/0001/30/d777b4a1d0336fe98ef7fef96b282d0cfb7bc9d0.jpeg'
    )

    db.session.add(idlm)
    db.session.add(antarctica)

    db.session.commit()


def undo_travels():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
