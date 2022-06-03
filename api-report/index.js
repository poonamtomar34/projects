const wrapper = document.querySelector(".wrapper"),
inputPart = document.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button"),
weatherPart = wrapper.querySelector(".weather-part"),
wIcon = weatherPart.querySelector("img"),
arrowBack = wrapper.querySelector("header i");

let api;

inputField.addEventListener("keyup", e =>{
    if(e.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value);
    }
});

locationBtn.addEventListener("click", () =>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        alert("Your browser not support geolocation api");
    }
});

function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e9fca73f1be298d87e28473e7c015d77`;
    fetchData();
}

function onSuccess(position){
    const {latitude, longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=e9fca73f1be298d87e28473e7c015d77`;
    fetchData();
}

function onError(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}

function fetchData(){
    infoTxt.innerText = "Getting weather details...";
    infoTxt.classList.add("pending");
    fetch(api).then(res => res.json()).then(result => weatherDetails(result)).catch(() =>{
        infoTxt.innerText = "Something went wrong";
        infoTxt.classList.replace("pending", "error");
    });
}

function weatherDetails(info){
    if(info.cod == "404"){
        infoTxt.classList.replace("pending", "error");
        infoTxt.innerText = `${inputField.value} isn't a valid city name`;
    }else{
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {temp, feels_like, humidity} = info.main;

        // if(id == 800){
        //     wIcon.src = "data:image/png;base64,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";
        // }else if(id >= 200 && id <= 232){
        //     wIcon.src = "data:image/png;base64,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";  
        // }else if(id >= 600 && id <= 622){
        //     wIcon.src = "data:image/png;base64,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";
        // }else if(id >= 701 && id <= 781){
        //     wIcon.src = "data:image/png;base64,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";
        // }else if(id >= 801 && id <= 804){
        //     wIcon.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAkFBMVEX///+c4P9hod2e4/9cn9x6u+uQu+Zdndtgod2f5P9Um9tZndxSmtuY3/9cnNuV3v+S1fne6veFx/F1tujv9fu/1/BtruSAwu5pqeH3+v2KzfSl4/9yquB9sOLl7/mW2fu20e6nyOubwei96v/I7f/U8f+x5v/R4vSSvObH3PLS8P/e9P/p+P+60+97r+KgxOlp+3FtAAAKkklEQVR4nO2dabeaMBCGC0QDBNxFcMe7eL3r//93BSUbmyhLgJPnQ3tOa715O8lkkkwm//5JJBKJRCKRSCQSiUQikUgkEolEIpFIJJL2sZiel0f/dPoYfpxO/nF53i9EN6k6psePLUAmQgggCACAwe8ImSbYnpZT0Y0ri3f2d4E2CHQ1iR4INdHO767KxXIXGCpVHCsTmODjLLqtz3AZmgjkimNUdk/k/g8VlReJhCbwu+N7pjvrTt9MBZkfe9FNL8R5a2WZD2Cy/t7atd/tTHdmSvsBhFB13fl8PhgMgl9dVQ3+JO2D5q7ddlwMk/YLtDmD2eSgGRrFUA7r2cAJlCftePJEy8jmaMUaDAJ1q4kSSFKShH86WTl63JYALEULyWC6RTHr6YO1kiqOkWko63nMkrr528qu6vMdFEJnfUcdsaUyc3hDAusoWk6CBW9AqK8ORiF9kcjDgDekuWvZaLxwBoTqrJj5WJHKSmc1AtSqKOfP0jl9yqP6boacqazGNvXUHdtD4eApfTc7DtjxaJ1EC4vwXEYgdA7P6rtqPDiMGdFOtLYreyYIA+raKKEvxJgx34e2LfA3e2YRAR27jAEjM9qMGYEqfMHBChytyhow0rhqkURGINAn5Q0YSZwws4YuVOKCjhnoVtBDiUTbhdSKAseip1KB8+r0XTXOqcStOIW/pBVwUGAI2oTHJKKhKIFDVFigbY+VzfvL6+fn2+fr68u7Mh7f02kMiETTFyPwaBYTGNhs8/oVG0ze9+e7Pc4VyUi0LiIEnq1CAsf2e1wd4ft1My4kUbcEOFSPdtF5pkB7/P6V/zVveRLpWIQCvM0Q/3DgZHnRQN/33e95zeupmoudNWo8Cl+SQehmNa+IvqAv5BlRUcjMbzW8XFwgvCAEhwx9myL6AnIFKgfSVdR6FcXZ4d4zWqf3Ufuz6FflTxraGktstp8SP5rhRu1Nqvv0vr+/vr6+Ob/4nd9LFYN4G6vJDTiyZ+GmWnD8kvgX328vG3s8Dif64Bfl/RX34U2+wABXQPR2xDMFnKQKfIvLe1FiIUygM5wnvTflfgQ3wUY0G5v3PVPHfTTNhOOYi/ncpMcuoTWLRKhk4m/O2ZxQXh+1eYGfBax0Dzwo0LEZgWSmSPWjNudHvirQR/2pDppR6OOZwknxo1wX9XLDzuIYTrNGxDPFKMXNjNkw9KvQQrAIxNnoTQjEjhSkBNzcPP9SjQFDjHnUb1ATB284GE6bKTbM596rE0iDN+DWL/Bs5pjwlX5uU1UPvWI40f+rVf9B/xBkj0JGYbUC6UgEH3UL9LCfcdMCUtJL3ysWGKwUI1eD6t5b/In8DJylhjORK32pWqCizWBDvuY36qR6ekOuIemicguG4G76W6/AhYX9TMbWhT3eKIWizUfR8IRh1utrlriTrmsQkc+6mQkDe1K12j38ImhknejWacUoIy+zk9apcEa2bEzXr2u9PzVxJ21eITVimDZlbetZDuOYFNbhS+4yGakUgMCxhqkRD8PU6b52jBWfHYaQX7nGKOoGqbsX9cOcuEUBTtULRhyyCRmGIcxxFNaoVroXjtcVo5R97mLnnqUlrtWYRmANK+yqeL5Xk/qU188KV7zZaMrMjSWkIlCdW8U7NIk9tvF12eTd392tQqMxGcQMaVW2pIpcaWK+t99vf3/nHKk6kaEhOTO6FZ2gbm8K4SqmkGywVb9qytJoTBx+dqzG4URfl1gb2vgDbw1GAtqEs6NVxbrRi6LS5MICf+Kz0VjHmKlsrmYFCRsLHLPFt2jI5kVjvfSGprAhgPlXXiGe8GPTIXY0RY7KKiaYH6kZzdJnqPu7CpsWGMvVLJ1ZtDczFJID0eYVBhoH1KmWTQ0nq8PYaBOrMHA4jMRy4Q1RGPsRtJc2NOPHoNkMqm6WWvxn2ZDMFveyDuqCkVjunHiaMQ7Jbn4t+6RFYCSWStUkChNHFuOXYAXjCRPISSwT3GQrDFaHG6WRBWIWdCdOR89H4aesmKYN0OU/ePQeirc/X5bHAJISHPel7UDDR4yqWbyfhiURXDOs9xBCwqPMdEvBkFkRFNvX2B+3Fkq7dy3gzKIQTJJfgRjc+wnlJcRdSc9lawF0KN5Nml785VR8SNtoawkaSZ7K37jxTmZOSYT0w992QPtprhH9tJIB1IItFsgmT2UvFacqyrQfgNCp7PZWPeDDm+yEhr9ETYRA1gjqboizmgg5kXkAchaecaDh/aKYOuAO1hObFHsQLeA+h9xc1D0/+UE4X9tGF2QxkJGYltBw5u/UhyURuqXuCnanMDlhXLg79UVLPrQOkjyVyLa9WIw+t/SVbGGQS8RmbJ//zFgQrjpqvyvY18SmxD0VCN2Wz3l3MHDKBpdPzF3oFd3EkpBuykVuzIXeWWdHIOaQksXo09uSonIQKgR7U2YgTokbzbqJ1ilw5MbckyKDsM0ro+LgbTedbGaQPlroUn0HwDnh+DofPhVUQdodmE6CXU0055ProBmJzd3D0DlnStxMH9zoDS1aXyCfM2HaDZGOQpzp6Rau4VEo8tShWrRVpPB6DPWBl1PxLKAOg+O26wGGR/adRDerQsg5VDjlk9sFPTIh2TbVXcbPtPM46UnoxjBN+hVxu6A+WIWXNp95Pg0JTF3qSfvkZ3hP42akxHYbZrZYiLwCUx/agMz4ebn3HUabR3HpH5kNQW9C0it4tw0dydq3rakHT6KNyPrwQ+wln7rAm23mHkc0vQrZ2EvR3r9t5Ep7sQFFIK50S28X9GyyiBwNPDEKRTeqUtg9714qpOcW+572UnzOfT3Jd/Ueehru/PC3h7MFfwa86+GMTwsThBttJ9C7qI2s729na0dcqKQ/kTc5474VI7oILSBQC6Q+yO3wcN+7FbBGkhOjI25cyKMvrkZb49xEnC/0m3U5u6MQR4rwPT2/X7uJZC6k6aXTfu0Ik6LDiF61xOe/QHTjqoC4GTZr769HJzP04Q/20gy+rNWDQ3yNFOjhCw5vQV+MaKsYvrYiDms6f8rNFKiP3QnCwjueqaCRS+uJem6k5kynQzda1zylsDlNLRXdzOdhBf7EBdIE7+xnHNrOvTdpSNpXVzP37r4rtKDPqVT06FajFHkb6oe8xjHqXg60NtHps2Eg61Iefb+wqqfTGsMgt9TDUkrZJSOYVP1OLYa55xIByqn6uTfpdQtHdLOLw72VmGfBf+zjTVW+gVcvBlcK6+4be0v22tOgA7eCjANXJrLAa5ecRL3lN7s0YzIfsXcJC1XdW/K38yYPPFjcMJq25t+ABimhWupY5C5xj9znXvWtG01LlE1EatHCQnuVf3lavf9weKOEd1rXg3jpS/BQXcidyV1VB1Cfr9b8y/aCMLTDZDZ3YfypeR2pj9W+PibKDUAIVdeZzwcCmTvOtSHJUgjg8TK7+62Z+Jrwm8SS1qRwAFqnZ+rPLgHK+MJ2oQN0erZekm+1XyNAyC9RldXzQXb1ljYArG3pcqXL38wKPIIByFSrKau/OAYiUU6lmsbRQaDO3B0rfDXAu/i/6FoIS6gnhSgYdYE25A5/6nj4YX9eHv+GIjn9+cfl5Sz8HXmJRCKRSCQSiUQikUgkEolEIpFIJBKJpM/8B9n385DN8PrRAAAAAElFTkSuQmCC";
        // }else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
        //     wIcon.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAkFBMVEX///+c4P9hod2e4/9cn9x6u+uQu+Zdndtgod2f5P9Um9tZndxSmtuY3/9cnNuV3v+S1fne6veFx/F1tujv9fu/1/BtruSAwu5pqeH3+v2KzfSl4/9yquB9sOLl7/mW2fu20e6nyOubwei96v/I7f/U8f+x5v/R4vSSvObH3PLS8P/e9P/p+P+60+97r+KgxOlp+3FtAAAKkklEQVR4nO2dabeaMBCGC0QDBNxFcMe7eL3r//93BSUbmyhLgJPnQ3tOa715O8lkkkwm//5JJBKJRCKRSCQSiUQikUgkEolEIpFIJJL2sZiel0f/dPoYfpxO/nF53i9EN6k6psePLUAmQgggCACAwe8ImSbYnpZT0Y0ri3f2d4E2CHQ1iR4INdHO767KxXIXGCpVHCsTmODjLLqtz3AZmgjkimNUdk/k/g8VlReJhCbwu+N7pjvrTt9MBZkfe9FNL8R5a2WZD2Cy/t7atd/tTHdmSvsBhFB13fl8PhgMgl9dVQ3+JO2D5q7ddlwMk/YLtDmD2eSgGRrFUA7r2cAJlCftePJEy8jmaMUaDAJ1q4kSSFKShH86WTl63JYALEULyWC6RTHr6YO1kiqOkWko63nMkrr528qu6vMdFEJnfUcdsaUyc3hDAusoWk6CBW9AqK8ORiF9kcjDgDekuWvZaLxwBoTqrJj5WJHKSmc1AtSqKOfP0jl9yqP6boacqazGNvXUHdtD4eApfTc7DtjxaJ1EC4vwXEYgdA7P6rtqPDiMGdFOtLYreyYIA+raKKEvxJgx34e2LfA3e2YRAR27jAEjM9qMGYEqfMHBChytyhow0rhqkURGINAn5Q0YSZwws4YuVOKCjhnoVtBDiUTbhdSKAseip1KB8+r0XTXOqcStOIW/pBVwUGAI2oTHJKKhKIFDVFigbY+VzfvL6+fn2+fr68u7Mh7f02kMiETTFyPwaBYTGNhs8/oVG0ze9+e7Pc4VyUi0LiIEnq1CAsf2e1wd4ft1My4kUbcEOFSPdtF5pkB7/P6V/zVveRLpWIQCvM0Q/3DgZHnRQN/33e95zeupmoudNWo8Cl+SQehmNa+IvqAv5BlRUcjMbzW8XFwgvCAEhwx9myL6AnIFKgfSVdR6FcXZ4d4zWqf3Ufuz6FflTxraGktstp8SP5rhRu1Nqvv0vr+/vr6+Ob/4nd9LFYN4G6vJDTiyZ+GmWnD8kvgX328vG3s8Dif64Bfl/RX34U2+wABXQPR2xDMFnKQKfIvLe1FiIUygM5wnvTflfgQ3wUY0G5v3PVPHfTTNhOOYi/ncpMcuoTWLRKhk4m/O2ZxQXh+1eYGfBax0Dzwo0LEZgWSmSPWjNudHvirQR/2pDppR6OOZwknxo1wX9XLDzuIYTrNGxDPFKMXNjNkw9KvQQrAIxNnoTQjEjhSkBNzcPP9SjQFDjHnUb1ATB284GE6bKTbM596rE0iDN+DWL/Bs5pjwlX5uU1UPvWI40f+rVf9B/xBkj0JGYbUC6UgEH3UL9LCfcdMCUtJL3ysWGKwUI1eD6t5b/In8DJylhjORK32pWqCizWBDvuY36qR6ekOuIemicguG4G76W6/AhYX9TMbWhT3eKIWizUfR8IRh1utrlriTrmsQkc+6mQkDe1K12j38ImhknejWacUoIy+zk9apcEa2bEzXr2u9PzVxJ21eITVimDZlbetZDuOYFNbhS+4yGakUgMCxhqkRD8PU6b52jBWfHYaQX7nGKOoGqbsX9cOcuEUBTtULRhyyCRmGIcxxFNaoVroXjtcVo5R97mLnnqUlrtWYRmANK+yqeL5Xk/qU188KV7zZaMrMjSWkIlCdW8U7NIk9tvF12eTd392tQqMxGcQMaVW2pIpcaWK+t99vf3/nHKk6kaEhOTO6FZ2gbm8K4SqmkGywVb9qytJoTBx+dqzG4URfl1gb2vgDbw1GAtqEs6NVxbrRi6LS5MICf+Kz0VjHmKlsrmYFCRsLHLPFt2jI5kVjvfSGprAhgPlXXiGe8GPTIXY0RY7KKiaYH6kZzdJnqPu7CpsWGMvVLJ1ZtDczFJID0eYVBhoH1KmWTQ0nq8PYaBOrMHA4jMRy4Q1RGPsRtJc2NOPHoNkMqm6WWvxn2ZDMFveyDuqCkVjunHiaMQ7Jbn4t+6RFYCSWStUkChNHFuOXYAXjCRPISSwT3GQrDFaHG6WRBWIWdCdOR89H4aesmKYN0OU/ePQeirc/X5bHAJISHPel7UDDR4yqWbyfhiURXDOs9xBCwqPMdEvBkFkRFNvX2B+3Fkq7dy3gzKIQTJJfgRjc+wnlJcRdSc9lawF0KN5Nml785VR8SNtoawkaSZ7K37jxTmZOSYT0w992QPtprhH9tJIB1IItFsgmT2UvFacqyrQfgNCp7PZWPeDDm+yEhr9ETYRA1gjqboizmgg5kXkAchaecaDh/aKYOuAO1hObFHsQLeA+h9xc1D0/+UE4X9tGF2QxkJGYltBw5u/UhyURuqXuCnanMDlhXLg79UVLPrQOkjyVyLa9WIw+t/SVbGGQS8RmbJ//zFgQrjpqvyvY18SmxD0VCN2Wz3l3MHDKBpdPzF3oFd3EkpBuykVuzIXeWWdHIOaQksXo09uSonIQKgR7U2YgTokbzbqJ1ilw5MbckyKDsM0ro+LgbTedbGaQPlroUn0HwDnh+DofPhVUQdodmE6CXU0055ProBmJzd3D0DlnStxMH9zoDS1aXyCfM2HaDZGOQpzp6Rau4VEo8tShWrRVpPB6DPWBl1PxLKAOg+O26wGGR/adRDerQsg5VDjlk9sFPTIh2TbVXcbPtPM46UnoxjBN+hVxu6A+WIWXNp95Pg0JTF3qSfvkZ3hP42akxHYbZrZYiLwCUx/agMz4ebn3HUabR3HpH5kNQW9C0it4tw0dydq3rakHT6KNyPrwQ+wln7rAm23mHkc0vQrZ2EvR3r9t5Ep7sQFFIK50S28X9GyyiBwNPDEKRTeqUtg9714qpOcW+572UnzOfT3Jd/Ueehru/PC3h7MFfwa86+GMTwsThBttJ9C7qI2s729na0dcqKQ/kTc5474VI7oILSBQC6Q+yO3wcN+7FbBGkhOjI25cyKMvrkZb49xEnC/0m3U5u6MQR4rwPT2/X7uJZC6k6aXTfu0Ik6LDiF61xOe/QHTjqoC4GTZr769HJzP04Q/20gy+rNWDQ3yNFOjhCw5vQV+MaKsYvrYiDms6f8rNFKiP3QnCwjueqaCRS+uJem6k5kynQzda1zylsDlNLRXdzOdhBf7EBdIE7+xnHNrOvTdpSNpXVzP37r4rtKDPqVT06FajFHkb6oe8xjHqXg60NtHps2Eg61Iefb+wqqfTGsMgt9TDUkrZJSOYVP1OLYa55xIByqn6uTfpdQtHdLOLw72VmGfBf+zjTVW+gVcvBlcK6+4be0v22tOgA7eCjANXJrLAa5ecRL3lN7s0YzIfsXcJC1XdW/K38yYPPFjcMJq25t+ABimhWupY5C5xj9znXvWtG01LlE1EatHCQnuVf3lavf9weKOEd1rXg3jpS/BQXcidyV1VB1Cfr9b8y/aCMLTDZDZ3YfypeR2pj9W+PibKDUAIVdeZzwcCmTvOtSHJUgjg8TK7+62Z+Jrwm8SS1qRwAFqnZ+rPLgHK+MJ2oQN0erZekm+1XyNAyC9RldXzQXb1ljYArG3pcqXL38wKPIIByFSrKau/OAYiUU6lmsbRQaDO3B0rfDXAu/i/6FoIS6gnhSgYdYE25A5/6nj4YX9eHv+GIjn9+cfl5Sz8HXmJRCKRSCQSiUQikUgkEolEIpFIJBKJpM/8B9n385DN8PrRAAAAAElFTkSuQmCC";
        // }
        
        weatherPart.querySelector(".temp .numb").innerText = Math.floor(temp);
        weatherPart.querySelector(".weather").innerText = description;
        weatherPart.querySelector(".location span").innerText = `${city}, ${country}`;
        weatherPart.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        weatherPart.querySelector(".humidity span").innerText = `${humidity}%`;
        infoTxt.classList.remove("pending", "error");
        infoTxt.innerText = "";
        inputField.value = "";
        wrapper.classList.add("active");
    }
}

arrowBack.addEventListener("click", ()=>{
    wrapper.classList.remove("active");
});