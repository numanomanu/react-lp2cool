import React from 'react';
import TextField from 'material-ui/TextField';

const OneLineInput = (field: Object): React.Element<*> =>
<TextField
    {...field.input}
    name={field.name}
    type={field.type}
    fullWidth={true}
    errorText={field.meta.touched && field.meta.error && (<div>{field.meta.error}</div>)}
    floatingLabelText={field.floatingLabelText}
/>

const MultiLineInput = (field: Object): React.Element<*> =>
<TextField
    {...field.input}
    name={field.name}
    type={field.type}
    multiLine={true}
    rows={4}
    fullWidth={true}
    errorText={field.meta.touched && field.meta.error && (<div>{field.meta.error}</div>)}
    floatingLabelText={field.floatingLabelText}
/>

export { OneLineInput, MultiLineInput }
