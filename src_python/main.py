import json
import collections
import pandas
import os, time
import japanize_matplotlib
import matplotlib.pyplot as plt
from datetime import datetime
import six
import random

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

number_of_questions = 50
json_load_from_firestore = []
all_answer_list = []
ranking_list = []
target_person_list = []

cred = credentials.Certificate("./credential.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

for doc in db.collections().__next__().get():

    value = doc.to_dict()

    if not ('name' in value.keys() and 'answers' in value.keys()):
        continue

    if len(value['answers']) != number_of_questions:
        continue

    json_load_from_firestore.append(doc.to_dict())

print(json_load_from_firestore)

json_load = json_load_from_firestore

def generate_answer_list():

    for name_index, value in enumerate(json_load):

        answer_dict = {}

        if not ('name' in value.keys() and 'answers' in value.keys()):
            json_load.pop(name_index)
            continue
        if len(value['answers']) != number_of_questions:
            json_load.pop(name_index)
            continue

        try:
            answer_dict.update({'name':value['name']})

            for answer_index, answer in enumerate(value['answers']):
                answer_dict[answer_index] = value['answers'][answer_index]['name']

            all_answer_list.append(answer_dict)

        except Exception as e:
            print(e)

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
                bscore = len(set(a + b)) - 2
                score = (number_of_questions * 2) - bscore

                target_name_dict.update({value['name'] : score})

            compare_list.append(target_name_dict)

        except Exception as e:
            print(e)

    try:
        pandas.read_json(json.dumps(compare_list)).to_excel('score_list' + datetime.now().strftime("%Y%m%d_%H%M%S")+'.xlsx',index=False)
    except Exception as e:
        print(e)

    total_score_dict = {}

    for a in compare_list:

        name = a.get('name')

        total = 0
        for i in a.values():
            if isinstance(i, int):
                total += i

        total_score_dict[name] = total

    name_list_for_ranking = []
    key_list_for_ranking = []
    value_list_for_ranking = []

    for a in compare_list:
        name_list_for_ranking.append(a.pop('name'))
        sorted_dict = {k:v for k,v in sorted(a.items(), key=lambda item: item[1], reverse=True)}

        key_list_for_ranking.append(list(sorted_dict.keys())[:5])
        value_list_for_ranking.append(list(sorted_dict.values())[:5])

    name_list_for_ranking.append('TOP5')
    name_list_for_ranking.append('LAST5')

    sorted_top_dict = {k:v for k,v in sorted(total_score_dict.items(), key=lambda item: item[1], reverse=True)}
    sorted_last_dict = {k:v for k,v in sorted(total_score_dict.items(), key=lambda item: item[1])}

    key_list_for_ranking.append(list(sorted_top_dict.keys())[:5])
    value_list_for_ranking.append(list(sorted_top_dict.values())[:5])

    key_list_for_ranking.append(list(sorted_last_dict.keys())[:5])
    value_list_for_ranking.append(list(sorted_last_dict.values())[:5])

    print("***********************************************************")
    print("listName = " + str(name_list_for_ranking))
    print("listKey = " + str(key_list_for_ranking))
    print("listValue = " + str(value_list_for_ranking))
    print("***********************************************************")


def generate_ranking():

    for i in range(number_of_questions):

        answer_list = []

        for name_index, value in enumerate(json_load):

            try:
                answer_list.append(value['answers'][i]['name'])
            except Exception as e:
                print(e)

        label_list = dict(collections.Counter(answer_list)).keys()
        count_list = dict(collections.Counter(answer_list)).values()
        ranking_list.append([list(label_list), list(count_list)])

    dict_all_answer_of_each_questions = {}

    for i in range(number_of_questions):
        questionNo = i

        for index, answer in enumerate(all_answer_list):
            dict_all_answer_of_each_questions[all_answer_list[index]['name']] = all_answer_list[index][questionNo]

        target_person_list_of_each_question = []

        for a_index, each_answer in enumerate(ranking_list[questionNo][0]):
            person = {k:v for k,v in six.iteritems(dict_all_answer_of_each_questions) if v == each_answer}

            target_persons = list(person.keys())
            random.shuffle(target_persons)
            target_person_list_of_each_question.append(str(target_persons[:3]))

        ranking_list[questionNo].append(target_person_list_of_each_question)

    f = open('ranking_list.txt', 'w', encoding='UTF-8')
    f.write(str(ranking_list))

if __name__ == "__main__":

    generate_answer_list()
    compare_answers()
    generate_ranking()
