
// đối tượng validator
function validator(options) {

  var selectorRules = {};
// hàm thực hiện validate
  function validate(inputElement,rule) {
    var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
    var errorMessage = rule.test(inputElement.value);

    // lấy ra các rules sủa selector
    var rules = selectorRules[rule.selector];

    // lập qua từng rule & kiểm tra
    // nếu có lỗi thì dừng KT
    for (var i = 0; i < rules.length; ++i) {
      errorMessage = rules[i](inputElement.value);
      if (errorMessage) break;
    }

    if (errorMessage) {
      errorElement.innerText = errorMessage;
      inputElement.classList.add('inputBorder');
    } else {
      errorElement.innerText = '';
      inputElement.classList.remove('inputBorder');
    }
    return !errorMessage;
  }
// lấy element của form cần validate khi submit
  var formElement = document.querySelector(options.form);
  if (formElement) {
    // khi submit form 
    formElement.onsubmit = function(e) {
      e.preventDefault(); 
      var isformValid = true; 


      options.rules.forEach(function(rule){
        var inputElement = formElement.querySelector(rule.selector);
        var isValid = validate(inputElement,rule);
        if (!isValid){
          isformValid  = false;
        }
      });

      if (isformValid){
        // trướng hợp submit với javaScrip
        if (typeof options.onSubmit === 'function'){

          var enableInputs = formElement.querySelectorAll('[name]');
          var formValues = Array.form(enableInputs).reduce(function(values,input){
            values[input.name] = input.value;
            return values;
          },{});
          options.onSubmit(formValues);
          // trường ợp sublit với hành vi mặt định
          }else{
            formElement.submit();
        }
      }

    }
    // lăng nghe sự kiện khi rule vào button input
    options.rules.forEach(function (rule) {
      // lưu lại các rule trong mổi input
      if(Array.isArray(selectorRules[rule.selector])){
        selectorRules[rule.selector].push(rule.test);
      }else{
        selectorRules[rule.selector] = [rule.test];
      }
      // end
      var inputElement = formElement.querySelector(rule.selector);
      if (inputElement) {
        // xử lý mổi khi người dùng rulus
        inputElement.onblur = function () {
          validate(inputElement,rule);

        }
        // xủ lý khi người dung nhập 
        inputElement.oninput = function() {
          var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
          errorElement.innerText = '';
          inputElement.classList.remove('inputBorder');
        }
      }
    });

  }
}
// định nghĩa
validator.isRequired = function (selector,message) {
  return {
    selector: selector,
    test: function (value) {
      return value.trim() ? undefined : message || 'vui lòng nhập trường này'
    }
  };

}
validator.isEmail = function(selector,message) {
  return {
    selector: selector,
    test: function (value) {
      var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      return regex.test(value) ? undefined : message || 'Trường này phải là email';
    }
  };
}
validator.isPassword = function(selector,min,message) {
  return {
    selector: selector,
    test: function (value) {
      return value.length>=min ? undefined : message || `Vui lòng nhập tối thiểu ${min} kí tự`;
    }
  };
}
// validator.EnterThePassword = function(selector,getCofirmValue,message) {
//   return { 
//     selector: selector,
//     test: function (value) {
//       return value == getCofirmValue() ? undefined : message || `giá trị nhập vào không chính xác`;
//     }
//   };
// }


/* <script> nhung trong ther html
var a = document.getElementById("login");
var b = document.getElementById("reg");
var c = document.getElementById("button");
function reg(){
    a.style.marginTop = "-380px";
    c.style.left = "50%";
}
function login(){
    a.style.marginTop = "0";
    c.style.left = "0";
}
// output mong muoons cuar chungs ta 
validator({
    form: '#login',               
    errorSelector:'.error',
    rules: [           
    validator.isRequired('#usernameLogin'),            
    validator.isPassword('#passwordLogin',6),
    ],
    // onSubmit = function(data){
    //     // call api
    //     console.log(data);
    // }  
}); 
validator({
    form: '#reg',               
    errorSelector:'.error',
    rules: [           
    validator.isRequired('#usernameReg', 'Vui lòng nhập tên đầy đủ của bạn'),            
    validator.isEmail('#emailReg','Email không chính xát'),
    validator.isPassword('#passwordReg',6),
    // validator.EnterThePassword('#EnterThePassword', function(){
    //     return document.querySelector('#reg #passwordReg').value;
    // }, 'Mật khẩu nhập lại không chính xác'),
    ], 
    // onSubmit = function(data){
    //     // call api
    //     console.log(data);
    // }                                                                              
}); 
</script> */