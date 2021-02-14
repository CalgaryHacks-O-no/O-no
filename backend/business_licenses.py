import os
import math
import pandas
# import matplotlib
from django.core.exceptions import MultipleObjectsReturned

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


def get_restaurant_communities(df: pandas.DataFrame, restaurant_idxs: set) -> set:
    # separate by community
    community_names = {'default'}
    communities = df['COMDISTNM']
    for idx in restaurant_idxs:
        community = communities[idx]
        if isinstance(community, str):
            community_names.add(community.split(',')[0].strip())
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


def get_community_obj_from_name(name: str) -> internal_models.Community:
    community = internal_models.Community.objects.filter(name=name)[0]
    return community


def add_restaurants_to_database() -> None:
    print(len(internal_models.Restaurant.objects.all()))
    # internal_models.Restaurant.objects.all().delete()
    # return
    df = read_business_licenses()
    idxs = get_restaurant_indexes(df)
    # print(len(idxs))
    communities = df['COMDISTNM']
    addresses = df['ADDRESS']
    restaurant_names = df['TRADENAME']
    longitudes = df['longitude']
    latitudes = df['latitude']
    restaurant_list = set()
    for idx in idxs:
        community = communities[idx]
        if not isinstance(community, str):
            continue
        community = get_community_obj_from_name(community.split(',')[0].strip())
        name = restaurant_names[idx]
        address = addresses[idx]
        longitude = longitudes[idx]
        latitude = latitudes[idx]
        if not isinstance(latitude, float) or math.isnan(latitude):
            continue
        if not isinstance(longitude, float) or math.isnan(longitude):
            continue

        existing = internal_models.Restaurant.objects.filter(name=name, address=address)
        if len(existing) > 0:
            continue
        new_restaurant = internal_models.Restaurant(
            name=name, address=address, community=community, longitude=longitude, latitude=latitude)
        # print(new_restaurant.name, new_restaurant.community, new_restaurant.address)
        restaurant_list.add(new_restaurant)
        # print(idx)
    internal_models.Restaurant.objects.bulk_create(restaurant_list)
    return None
