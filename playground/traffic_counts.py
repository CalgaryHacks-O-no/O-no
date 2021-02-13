import pandas
import matplotlib

df = pandas.read_csv('Calgary_Business_Licenses_Map.csv')

restaurant_idxs = set()

# grab all food and grocery stores
license_types = df['LICENCETYPES']
for idx in range(len(license_types)):
    if 'FOOD SERVICE' in license_types[idx]:
        restaurant_idxs.add(idx)

# separate by community
community_restaurant = {}
communities = df['COMDISTNM']
names = df['TRADENAME']

for idx in restaurant_idxs:
    name = names[idx].strip()
    # print(name)

    community = communities[idx]
    if not isinstance(community, str):
        continue
    community = community.split(',')[0].strip()
    # print(community, type(community))

    if community not in community_restaurant:
        community_restaurant[community] = []
    community_restaurant[community].append(name)

print(len(community_restaurant))
