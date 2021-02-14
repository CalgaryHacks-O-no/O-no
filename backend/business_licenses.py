import os
import pandas
# import matplotlib
import backend.models as internal_models
from Ono.settings import BASE_DIR


def read_business_licenses() -> pandas.DataFrame:
    df = pandas.read_csv(os.path.join(BASE_DIR, 'backend/Calgary_Business_Licenses_Map.csv'))
    return df


def get_restaurant_indexes(df: pandas.DataFrame) -> set:
    restaurant_idxs = set()

    # grab all food and grocery stores
    license_types = df['LICENCETYPES']
    for idx in range(len(license_types)):
        if 'FOOD SERVICE' in license_types[idx]:
            restaurant_idxs.add(idx)
    return restaurant_idxs


def clean_community_name(s: str) -> str:
    return s.split(',')[0].strip()


def get_restaurant_communities(df: pandas.DataFrame, restaurant_idxs: set) -> set:
    # separate by community
    community_names = {'default'}
    communities = df['COMDISTNM']
    for idx in restaurant_idxs:
        community = communities[idx]
        if not isinstance(community, str):
            continue
        community_names.add(community)
    return community_names


def add_communities_to_database() -> None:
    df = read_business_licenses()
    names = get_restaurant_communities(df, get_restaurant_indexes(df))
    for name in names:
        same_names = internal_models.Community.objects.filter(name=name)
        if len(same_names) == 0:
            new_community = internal_models.Community(name=name)
            new_community.save()
        else:
            community_to_alter = same_names[0]
            # remove extras
            if len(same_names) > 1:
                for dup in same_names:
                    dup.delete()
            # do nothing there are no other attributes to alter
    return None


def get_community_obj_from_name(name:str)->internal_models.Community:
    community = internal_models.Community.objects.get(name=name)
    return community


def add_restaurants_to_database() -> None:
    df = read_business_licenses()
    idxs = get_restaurant_indexes(df)
    communities = df['COMDISTNM']
    addresses = df['ADDRESS']
    restaurant_names = df['TRADENAME']
    longitudes = df['longitude']
    latitudes = df['latitude']
    for idx in idxs:
        community = get_community_obj_from_name(clean_community_name(communities[idx]))
        new_restaurant = internal_models.Restaurant(
            name=restaurant_names[idx], address=addresses[idx], community=community, longitude=longitudes[idx],
            latitude=latitudes[idx])
        new_restaurant.save()
    return None
