import { build, fake } from '@jackfranklin/test-data-bot'

const userBuilder = build('User', {
  fields: {
    email: fake((f) => f.internet.email()),
    password: fake((f) => f.internet.password()),
    username: fake((f) => f.name.firstName()),
  }
});

const bookmarkBuilder = build('Bookmark', {
  fields: {
    title: fake((f) => f.internet.domainName()),
    url: fake((f) => f.internet.url()),
    description: fake((f) => f.lorem.words()),
  //   category_id: fake((f) => f.random.number({
  //     'min': 1,
  //     'max': 16
  //   })),
  //   language_id: fake((f) => f.random.number({
  //     'min': 1,
  //     'max': 26
  //   })),
  }
});

const goalBuilder = build('Goal', {
  fields: {
    title: fake((f) => f.name.findName()),
    body: fake((f) => f.lorem.words()),
  }
});

const journalBuilder = build('Journal', {
  fields: {
    title: fake((f) => f.name.findName()),
    body: fake((f) => f.lorem.paragraphs()),
  }
});

export {
  userBuilder,
  bookmarkBuilder,
  goalBuilder,
  journalBuilder
}