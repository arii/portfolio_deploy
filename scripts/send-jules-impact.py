import os
import requests
import sys

def main():
    task_id = os.getenv('TASK_ID')
    jules_api_key = os.getenv('JULES_API_KEY')
    impact_body = os.getenv('IMPACT_BODY', 'No impact report found.')

    if not task_id or not jules_api_key:
        print('Missing TASK_ID or JULES_API_KEY. Skipping.')
        return

    # Standard endpoint for Jules impact feedback
    url = f'https://jules.google.com/api/task/{task_id}/impact'
    headers = {
        'Authorization': f'Bearer {jules_api_key}',
        'Content-Type': 'application/json'
    }
    data = {
        'impact': impact_body
    }

    try:
        response = requests.post(url, json=data, headers=headers)
        response.raise_for_status()
        print(f'Successfully sent impact to Jules task {task_id}')
    except Exception as e:
        print(f'Error sending impact to Jules: {e}')
        # Don't fail CI for this
        pass

if __name__ == '__main__':
    main()
