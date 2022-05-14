import json
import collections

json_open = open('data/sample.json', 'r')
json_load = json.load(json_open)

def analyze():

    name_list = []

    for name_index, value in enumerate(json_load):

        answer_list = []

        try:
            print(value['name'])
            print(value['answers'][name_index]['answer'])

            for answer_index, answer in enumerate(value['answers']):

                answer_list.append(value['answers'][answer_index]['answer'])
                target_name = value['name']

            name_list.append(dict(collections.Counter(answer_list)))

        except Exception as e:
            print(e)


    print(name_list)

if __name__ == "__main__":
    analyze()
