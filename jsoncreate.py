import asyncio
import random
import json
from tcgdexsdk import TCGdex, Query
import datetime

# YYYYMMDAY
async def get_random_cards(count: int = 50, trainer: bool = False):
    sdk = TCGdex("en")
    t = datetime.datetime.now()
    #get some cards
    query = (
        Query()
            .equal("rarity", "Common|Uncommon|Rare")
            .contains("pricing.tcgplayer", "")
    )

    if trainer:
        query = query.equal("category", "Trainer")
        query = query.notEqual("category", "energy")
    else:
        query = query.notEqual("category", "Trainer")
        query = query.notEqual("category", "energy")
        
    all_cards = await sdk.card.list(query)
    print(f"Total cards available: {len(all_cards)}")
    #pick random cards
    count = min(count, len(all_cards))
    sample = random.sample(all_cards, count)
    samples = []
    paid = []
    # The jank part
    for card in sample:
        dateFormat = t.strftime("%Y%m%d")
        # I wasn't sure how to change from the cardresume object type into the card object type so this is what I did
        carded = await sdk.card.get(card.id)
        card_img = carded.get_image_url("high","webp")
        # Likely a way to filter out cards without description and image before this part but I couldn't find it in the docs
        if carded.description != None and card_img  != None:
            payload = {
                "name": carded.name,
                "dexNumber": carded.dexId,
                "anAttack": carded.attacks[0].name if carded.attacks else "None",
                "stage": carded.stage,
                "anAbility": carded.abilities[0].name if carded.abilities else "None",
                "description": carded.description,
                "types": carded.types,
                "image": card_img,
                "date": dateFormat
            }
            samples.append(payload)
            t += datetime.timedelta(days=1)
    paid = json.dumps(samples, ensure_ascii=False)
 
    return paid


async def main():
  # Now only Pokemon
    cards = await get_random_cards(300,False)
    with open("CUBEOUTPUT.json", "w", encoding="utf-8") as text_file:
        text_file.write(cards)

asyncio.run(main())