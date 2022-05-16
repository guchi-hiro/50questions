import json
import collections
import pandas
import os, time
import japanize_matplotlib
import matplotlib.pyplot as plt
from datetime import datetime

json_open = open('data/g.json', 'r', encoding='utf-8')
json_load = json.load(json_open)

all_answer_list = []

def generate_answer_list():

    for name_index, value in enumerate(json_load):

        answer_dict = {}

        try:

            answer_dict.update({'name':value['name']})

            for answer_index, answer in enumerate(value['answers']):
                answer_dict[answer_index] = value['answers'][answer_index]['answer']

            all_answer_list.append(answer_dict)

        except Exception as e:
            print(e)

    print(all_answer_list)

    try:
        pandas.read_json(json.dumps(all_answer_list)).to_excel('answer_list' + datetime.now().strftime("%Y%m%d_%H%M%S")+'.xlsx',index=False)
    except Exception as e:
        print(e)

def compare_answers():

    compare_list = []

    for all_answer_index, value in enumerate(all_answer_list):

        target_name_dict = {}

        try:
            target_name_dict.update({'name':value['name']})
            target_answer_list = all_answer_list[all_answer_index]

            for target_answer_index, value in enumerate(all_answer_list):

                a = list(target_answer_list.items())
                b = list(all_answer_list[target_answer_index].items())
                score = len(set(a + b))

                target_name_dict.update({value['name'] : score})

            compare_list.append(target_name_dict)

        except Exception as e:
            print(e)

    try:
        pandas.read_json(json.dumps(compare_list)).to_excel('score_list' + datetime.now().strftime("%Y%m%d_%H%M%S")+'.xlsx',index=False)
    except Exception as e:
        print(e)

    print(compare_list)

def generate_ranking():

    ranking_list = []
    answer_list = []

    i = 2

    for name_index, value in enumerate(json_load):

        try:
            answer_list.append(value['answers'][i]['answer'])
        except Exception as e:
            print(e)


    answers_dict = dict(collections.Counter(answer_list))
    ranking_list.append(answers_dict)

    print(ranking_list)

    for ranking_index, ranking in enumerate(ranking_list):

        fig1, ax1 = plt.subplots()
        ax1.pie(ranking.values(),
                labels=ranking.keys(),
                autopct='%1.1f%%',
                shadow=True, startangle=90)
        ax1.axis('equal')  # Equal aspect ratio ensures that pie is drawn as a circle.

        plt.show()


if __name__ == "__main__":

    generate_answer_list()
    compare_answers()
    generate_ranking()
