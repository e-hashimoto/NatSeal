from app.models import db, Seal

def seed_seals():
    harp = Seal(
        user_id=1, name='Harp Seal/Greenland Seal', scientific_name='Pagophilus groenlandicus', image_url='https://storage.googleapis.com/oceanwide_web/media-dynamic/cache/widen_1600/media/default/0001/16/df2ee50050483cec9d8c0dafddfb6e1717814ce5.jpeg', description="Harp seals spend relatively little time on land and prefer to swim in the North Atlantic and Arctic Oceans. These sleek swimmers cruise the chilly waters and feed on fish and crustaceans. They can remain submerged for up to 15 minutes. Harp seals are sometimes called saddleback seals because of the dark, saddlelike marking on the back and sides of their light yellow or gray bodies. Both sexes return each year to breeding grounds in Newfoundland, the Greenland Sea, and the White Sea. On this turf males fight for their mates, battling with sharp teeth and powerful flippers. When the mating ends, females gather in groups to give birth. Young harp seals are born on the ice, and mothers identify their own offspring from the multitudes by their smell. The young seals are famous for their snowy white coats. This fluffy fur is highly valued and has drawn hunters to the Newfoundland breeding grounds for two centuries. During the past several decades these grounds have become the scene of a human conflict between sealers and outraged environmentalists and animal rights activists. Modern hunts are better regulated than in the past, but the harp seal remains perhaps the most commercially important seal, with hundreds of thousands killed each year."
    )
    leopard = Seal(
        user_id=1, name='Leopard Seal', scientific_name='Hydrurga leptonyx', image_url='https://media.npr.org/assets/img/2017/06/06/leopard-seal-0012-7f54636843d529c8254527536f94c54dfa213d52.jpg', description="The leopard seal is named for its black-spotted coat. The pattern is similar to that of the famous big cat, though the seal's coat is gray rather than golden in color."
    )

    db.session.add(harp)
    db.session.add(leopard)

    db.session.commit()


def undo_seals():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
