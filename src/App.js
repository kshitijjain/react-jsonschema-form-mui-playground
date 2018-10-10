import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Form from "react-jsonschema-form-material";
import { RaisedButton } from 'material-ui';

class App extends Component {
  constructor(props){
    super(props);

    this.state= {
      formData: {
       textFieldA: "nitesh",
       dropDownA: "b"
      },
      schema: {
        type: 'object',
        required: ['textFieldB'],
        properties: {
          textFieldA: {
            title: 'Text Field A',
            type: 'string'
          },

          textFieldB: {
            title: 'Text Field B',
            type: 'string',
            errorMessages: {  
              pattern: "Some rubbish",  
              required: "dfgdfjh"
            }
          },

          dropDownA: {
            title: 'Drop Down A',
            type: 'string',
            enum: ['a', 'b', 'c'],
            enumNames: ['A', 'B', 'C']
          },

          amount: {
            title: 'Amount',
            type: 'string',
            pattern: '^[+-]?(?!0*[.,]?0+$)[0-9]{0,8}[.,]?[0-9]{1,2}$',
            errorMessages: {  
              pattern: "Some rubbish"
              // required: "dfgdfjh"
            }
          },

          approvedAmount: {
            title: 'Approved Amount',
            type: 'string'
          },

          claimedAmount: {
            title: 'Claimed Amount',
            type: 'string'
          },

          // parentField: {
          //   type: 'string',
          //   title: 'Parent Field',
          //   enum: ['kshitij', 'nitesh', 'akash', 'jack']
          // }
        },

        // dependencies: {
        //   parentField: {
        //     oneOf: [
        //       {
        //         properties: {
        //           parentField: {
        //             enum: ["nitesh"]
        //           },
        //           childNitesh: {
        //             title: 'Child Nitesh',
        //             type: 'string'
        //           }
        //         }
        //       },

        //       {
        //         properties: {
        //           parentField: {
        //             enum: ['kshitij']
        //           },
        //           childKshitij: {
        //             title: 'Child Kshitij',
        //             type: 'string'
        //           }
        //         }
        //       },

        //       {
        //         properties: {
        //           parentField: {
        //             enum: ['akash', 'jack']
        //           },
        //           multipleChild: {
        //             title: 'Multiple Child',
        //             type: 'string'
        //           }
        //         }
        //       }
        //     ]
        //   }
        // }
      },
      uiSchema: {
        textFieldA: {
          // 'ui:disabled': true,
          classNames: "mui-col-md-4"
        },
        textFieldB: {
          classNames: "mui-col-md-4"
        },
        dropDownA: {
          classNames: "mui-col-md-4"
        },
        amount: {
          classNames: "mui-col-md-4"
        },
        claimedAmount: {
          classNames: "mui-col-md-4"
        },
        approvedAmount: {
          classNames: "mui-col-md-4"
        },
        parentField: {
          classNames: "mui-col-md-4"
        },
        childKshitij: {
          classNames: "mui-col-md-4"
        },
        childNitesh: {
          classNames: "mui-col-md-4"
        },
        multipleChild: {
          classNames: "mui-col-md-4"
        },


      }
    };
  }

  checkState(){
    console.log(this.state);
  }

  transformErrors(errors){
    console.log(errors);
    let $this= this;

    return errors.map(function(error){

      return Object.assign({}, error, {
          message: $this.state.schema.properties && error.property && $this.state.schema.properties[error.property.split('.')[1]] && $this.state.schema.properties[error.property.split('.')[1]].errorMessages ? $this.state.schema.properties[error.property.split('.')[1]].errorMessages[error.name] : error.message,
      });
    
    });

    return errors;
  }

  validate(formData, errors){
    console.log(formData, errors);

    if(formData.approvedAmount!= undefined && formData.claimedAmount!= undefined && parseInt(formData.approvedAmount)> parseInt(formData.claimedAmount)){
      errors.approvedAmount.addError("Approved amount cannot be greater than claimed amount");
    }

    return errors;
  }

  onSubmit(obj){
    console.log(obj);
  }

  onChange(obj){
    console.log(obj);
  }

  onBlur(id, value){
    console.log(id, value);
  }

  render() {
    return (
      <div style={{marginLeft: '5%', marginRight: '5%'}}>
        <div>
          <Form
            schema= {this.state.schema}
            uiSchema= {this.state.uiSchema}
            formData= {this.state.formData}
            onSubmit= {this.onSubmit.bind(this)}
            onChange= {this.onChange.bind(this)}
            onBlur= {this.onBlur.bind(this)}
            transformErrors={this.transformErrors.bind(this)}
            validate={this.validate.bind(this)}
            noHtml5Validate= {true}
            liveValidate= {true}
          >
    
            <RaisedButton
              type= "submit"
              label= "Submit"
            />

          </Form>
        </div>

        {/* <div style={{marginTop: 20}}>
          <button onClick={this.checkState.bind(this)}>Check State</button>
        </div> */}
      </div>
    );
  }
}

export default App;
