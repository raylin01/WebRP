import requests
import json
import time

#Helper function to replace the line in a file
def replace_line(file_name, line_num, text):
    lines = open(file_name, 'r').readlines()
    lines[line_num] = text
    out = open(file_name, 'w')
    out.writelines(lines)
    out.close()

#Change your user ID to the one matching the one in the database!
userID = "<INSERTIDHERE>"

if userID=="<INSERTIDHERE>":
    sys.exit();

known_sites_list = []

#Read in Known Websites list
with open('known_sites.txt', 'r') as content_file:
    content = content_file.read()
    known_sites_list = content.split(',')

#Forever loop that runs every 10 seconds, replaces each line with updated info from database
while True:
    url = 'https://raylin3.web.illinois.edu/webrp/getuserinfo'
    myobj = {'id': userID}
    x = requests.post(url, data = myobj)
    y = json.loads(x.text)
    replace_line('config.ini', 23, 'State='+y["url"][0:64]+'\n')
    replace_line('config.ini', 24, 'Details='+y["title"][0:64]+'\n')
    replace_line('config.ini', 25, 'StartTimestamp='+str(y["time"])+'\n')
    if (y.get("logo","default") not in known_sites_list):
        replace_line('config.ini', 29, 'LargeImage=default\n')
    else:
        replace_line('config.ini', 29, 'LargeImage='+y["logo"]+'\n')
    time.sleep(10);
