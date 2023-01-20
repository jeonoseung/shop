

// export const UserIdCheck=(value:string)=>{
//     const test = /[0-9a-zA-z]{5,20}$/
//     const sp = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/
//     return !test.test(value) || sp.test(value)
// }
export class RegExp{
    constructor() {

    }
    /**
     * 사용자 아이디 확인
     * 메시지 : 영문자 또는 숫자로 5~20자 입력이 필요합니다(공백 불가)
     * */
    static UserIdCheck(value: string) {
        const test = /[0-9a-zA-z]{5,20}$/
        const sp = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/
        return {
            status:!test.test(value) || sp.test(value),
            msg:'영문자 또는 숫자로 5~20자 입력이 필요합니다(특수문자 불가)'
        }
    }
    /**
     * 사용자 비밀번호 확인
     * 메시지 : 영문자 & 숫자를 포함한 7~20자 입력이 필요합니다(공백 불가)
     * */
    static UserPassCheck(value:string){
        const test = /^(?=.{7,20})(?=.*[0-9])(?=.*[a-zA-Z])/
        return {
            status:!test.test(value) || /\s/g.test(value),
            msg:'문자 & 숫자를 포함한 7~20자 입력이 필요합니다(공백 불가)'
        }
    }
    /**
     * 사용자 비밀번호 재확인
     * 메시지 : 비밀번호와 비밀번호 확인의 입력 값이 같지 않습니다
     * */
    static UserPassCheckRe(value:string,same:string){
        return {
            status: value !== same,
            msg:'비밀번호와 비밀번호 확인의 입력 값이 같지 않습니다'
        }
    }
    /**
     * 사용자 이름 확인
     * 메시지 : 한글 또는 영문자로 2~20자 입력이 필요합니다
     * */
    static UserNameCheck(value:string){
        const test = /[ㄱ-ㅎ가-힣a-zA-Z]{2,20}/
        const sp = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/
        return {
            status:!test.test(value) || value === '' || sp.test(value),
            msg:'한글 또는 영문자로 2~20자 입력이 필요합니다'
        }
    }
    /**
     * 사용자 이메일 확인
     * 메시지 : 올바른 이메일 형식이 아닙니다
     *  */
    static UserEmailCheck(value:string){
        const test = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
        return {
            status:!test.test(value),
            msg:'올바른 이메일 형식이 아닙니다'
        }
    }

    /**
     * 사용자 휴대폰 번호 확인
     * 메시지 : 올바른 휴대폰 번호 형식이 아닙니다
     */
    static UserPhoneCheck(value:string){
        const test = /^010/
        return {
            status : value === '' || value.length < 10 || !test.test(value),
            msg:'올바른 휴대폰 번호 형식이 아닙니다'
        }
    }
    /**
     * 사용자 주소 확인
     * 메시지 : 주소 입력이 필요합니다
     * */
    static UserAddressCheck(value:string){
        return {
            status : value === '',
            msg:'주소 입력이 필요합니다'
        }
    }
    /**
     * 사용자 성별 확인
     * 메시지 : 성별 선택이 필요합니다
     * */
    static UserGenderCheck(value:string){
        return {
            status : value === '',
            msg:'성별 선택이 필요합니다'
        }
    }
    /**
     * 사용자 생년월일 확인
     * 메시지 : 생년월일을 다시 확인 해주세요
     * */
    static UserBirthCheck(value:string){
        const [year,month,day] = value.split('/');
        const date = new Date();
        const current_year = date.getFullYear();
        if(year === '' || month === '' || day === '' ||
            parseInt(year) < current_year-120 || parseInt(month) > 12 || parseInt(month) < 1 ||
            parseInt(day) > 31 || parseInt(day) < 1)
        {
            return {
                status : year === '' || month === '' || day === '' ||
                    parseInt(year) < current_year-120 || parseInt(month) > 12 || parseInt(month) < 1 ||
                    parseInt(day) > 31 || parseInt(day) < 1,
                msg:'생년월일을 다시 확인 해주세요'
            }
        }
        else if(parseInt(year) > current_year-14)
        {
            return {
                status : parseInt(year) > current_year-14,
                msg:'14세 미만은 회원가입이 불가능합니다'
            }
        }
        return {
            status:year === '' || month === '' || day === '' ||
                parseInt(year) < current_year-120 || parseInt(month) > 12 || parseInt(month) < 1 ||
                parseInt(day) > 31 || parseInt(day) < 1 || parseInt(year) > current_year-14,
            msg:'null'
        }
    }
}