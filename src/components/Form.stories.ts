import type { Meta, StoryObj } from '@storybook/vue3';
import Form from './Form.vue'

const meta: Meta<typeof Form> = {
  title: 'Form/Connexion',
  component: Form,
  argTypes: {
    email: {
      control: 'text',
      description: 'Adresse email saisie dans le champ.',
    },
    password: {
      control: 'text',
      description: 'Mot de passe saisi dans le champ.',
    },
    onSubmit: {
      action: 'submit',
      description: 'Action déclenchée lors de la soumission du formulaire.',
    },
  },
};

export default meta;


export const Default: StoryObj = {
  render: (args) => ({
    components: { Form },
    setup() {
      return { args };
    },
    template: `
      <Form 
        v-bind="args"
        @submit="args.onSubmit"
      />
    `,
  }),
  args: {
    email: '',
    password: '',
  },
};

