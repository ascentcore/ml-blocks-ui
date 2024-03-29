const schema = {
  '$id': 'https://example.com/person.schema.json',
  '$schema': 'http://json-schema.org/draft-07/schema#',
  'type': 'object',
  'title': 'Person',
  'description': 'Person Information',
  'required': ['firstName', 'lastName', 'type', 'phoneNumbers'],
  'properties': {
    'firstName': {
      'type': 'string',
      'title': 'First Name',
      'description': 'The person\'s first name.'
    },
    'lastName': {
      'type': 'string',
      'title': 'Last Name',
      'description': 'The person\'s last name.'
    },
    'age': {
      'title': 'Age',
      'description': 'Age in years which must be equal to or greater than zero.',
      'type': 'integer',
      'minimum': 10
    },
    'type': {
      'title': 'Type',
      'type': 'string',
      'enum': ['NW', 'NE', 'SW', 'SE']
    },
    'agree': {
      'title': 'Agree with TOC',
      'type': 'boolean',
      'default': false
    },
    'phoneNumbers': {
      'title': 'Phone numbers',
      'type': 'array',
      'items': {
        'title': 'Phone number',
        'type': 'string',
        'pattern': '^[0-9]+$'
      }
    }
  }
}
export default schema;
