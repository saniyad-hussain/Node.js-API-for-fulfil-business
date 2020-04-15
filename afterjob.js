console.log('test results');
console.log(process.env.SEMAPHORE_THREAD_RESULT);


const opsgenie = require('opsgenie-sdk');

opsgenie.configure({
  'api_key': 'dd49fc7b-14ff-440f-a571-cb55a2e292d1'
});

if (process.env.SEMAPHORE_THREAD_RESULT === 'passed') {
  console.log('Test completed successfully');
} else {

  const createAlertJson = {
    'message': 'An critical issue occured',
    'alias': 'Life is too short for no alias',
    'description': 'Every alert needs a description',
    'responders': [
      {
        'id': '4513b7ea-3b91-438f-b7e4-e3e54af9147c',
        'type': 'team'
      },
      {
        'name': 'NOC',
        'type': 'team'
      },
      {
        'id': 'bb4d9938-c3c2-455d-aaab-727aa701c0d8',
        'type': 'user'
      },
      {
        'username': 'trinity@opsgenie.com',
        'type': 'user'
      },
      {
        'id': 'aee8a0de-c80f-4515-a232-501c0bc9d715',
        'type': 'escalation'
      },
      {
        'name': 'Nightwatch Escalation',
        'type': 'escalation'
      },
      {
        'id': '80564037-1984-4f38-b98e-8a1f662df552',
        'type': 'schedule'
      },
      {
        'name': 'First Responders Schedule',
        'type': 'schedule'
      }
    ],
    'visibleTo': [
      {
        'id': '4513b7ea-3b91-438f-b7e4-e3e54af9147c',
        'type': 'team'
      },
      {
        'name': 'rocket_team',
        'type': 'team'
      },
      {
        'id': 'bb4d9938-c3c2-455d-aaab-727aa701c0d8',
        'type': 'user'
      },
      {
        'username': 'trinity@opsgenie.com',
        'type': 'user'
      }
    ],
    'actions': [
      'Restart',
      'AnExampleAction'
    ],
    'tags': [
      'OverwriteQuietHours',
      'Critical'
    ],
    'details': {
      'key1': 'value1',
      'key2': 'value2'
    },
    'entity': 'An example entity',
    'priority': 'P1'
  };

  opsgenie.alertV2.create(createAlertJson, (error, alert) => {
    if (error) {
      console.error(error);
    } else {
      console.log(alert);
    }

  });

}
