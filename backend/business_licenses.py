import pandas
import matplotlib
import backend.models as internal_models


def read_business_licenses()->pandas.DataFrame:
    df = pandas.read_csv('Calgary_Business_Licenses_Map.csv')
    return df


def get_restaurant_indexes(df:pandas.DataFrame)->set:
    restaurant_idxs = set()

    # grab all food and grocery stores
    license_types = df['LICENCETYPES']
    for idx in range(len(license_types)):
        if 'FOOD SERVICE' in license_types[idx]:
            restaurant_idxs.add(idx)
    return restaurant_idxs


def get_restaurant_communities(df:pandas.DataFrame, restaurant_idxs:set)->set:
    # separate by community
    community_names = {'default'}
    communities = df['COMDISTNM']
    for idx in restaurant_idxs:
        community = communities[idx]
        if not isinstance(community, str):
            continue
        community = community.split(',')[0].strip()
        community_names.add(community)
    return community_names


def add_communities_to_database(names:set)->None:
    for name in names:
        new_community = internal_models.Community(name=name)
        new_community.save()


if __name__ == '__main__':
    df = read_business_licenses()
    print(internal_models.Community.objects.all())
    add_communities_to_database(get_restaurant_communities(df, get_restaurant_indexes(df)))
    print(internal_models.Community.objects.all())





# separate by community
# community_restaurant = {}
# communities = df['COMDISTNM']
# names = df['TRADENAME']
#
# for idx in restaurant_idxs:
#     name = names[idx].strip()
#     print(name)
    #
    # community = communities[idx]
    # if not isinstance(community, str):
    #     continue
    # community = community.split(',')[0].strip()
    # print(community, type(community))

    # if community not in community_restaurant:
    #     community_restaurant[community] = []
    # community_restaurant[community].append(name)
#
#
# print(len(community_restaurant))
