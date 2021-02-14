import os
import pandas

from Ono.settings import BASE_DIR
import backend.models as internal_models


def read_file() -> pandas.DataFrame:
    return pandas.read_csv(os.path.join(BASE_DIR, 'backend/Community_Boundaries.csv'))


def update_communities_in_database() -> None:
    #remove
    print(len(internal_models.Community.objects.all()))
    print(len(internal_models.Restaurant.objects.all()))
    internal_models.Restaurant.objects.all().delete()
    internal_models.Community.objects.all().delete()
    #re add
    df = read_file()
    polygons = df['the_geom']
    names = df['NAME']
    sectors = df['SECTOR']
    community_list = []
    for idx in range(len(polygons)):
        name = names[idx]
        polygon = polygons[idx]
        sector = sectors[idx]
        community_list.append(internal_models.Community(name=name, location=polygon, sector=sector))
    internal_models.Community.objects.bulk_create(community_list)
    print(len(internal_models.Community.objects.all()))
    print(len(internal_models.Restaurant.objects.all()))
    return None
