$(document).ready(() => {
	isLoggedIn();
	$("#login-form").on("submit", logIn);
	$("#logout").on("click", logOut);
});

const isLoggedIn = () => {
	const access_token = localStorage.getItem("access_token");
	if (!access_token) {
		$("#main-page").hide();
		$("#login-page").show();
	} else {
		$("#main-page").show();
		$("#login-page").hide();
		getData();
	}
};

const logIn = (e) => {
	e.preventDefault();
	const email = $("#email");
	const password = $("#password");

	$.ajax({
		type: "POST",
		url: "http://localhost:3000/login",
		data: {
			email: email.val(),
			password: password.val(),
		},
	})
		.done((data) => {
			localStorage.setItem("access_token", data.data.access_token);
		})
		.fail((err) => {
			console.log(err);
		})
		.always(() => {
			email.val("");
			password.val("");
			isLoggedIn();
		});
};

const logOut = (e) => {
	e.preventDefault();
	localStorage.removeItem("access_token");
	isLoggedIn();
};

const getData = () => {
	const galleryPage = $("#my-gallery-page");
	galleryPage.empty();
	$.ajax({
		type: "GET",
		url: "http://localhost:3000/photos",
		headers: {
			access_token: localStorage.getItem("access_token"),
		},
	})
		.done((data) => {
			console.log(data);
			data.photos.forEach((photo) => {
				galleryPage.append(
					`
          <div
					  class="card-custom uk-card uk-card-default uk-card-hover uk-card-body"
				  >
            <i class="trash far fa-minus-square"></i>
            <img
              src="${photo.imageUrl}"
              alt="image"
            />
				  </div>
          `
				);
			});
		})
		.fail()
		.always();
};
