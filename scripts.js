var globalComments = [
    {
        id:42,
        username:"Codor",
        subject:"Hello?",
        comment: "YEEEET Lorem ipsum dolor sit amet, <strong>consectetur adipiscing</strong> elit. Maecenas imperdiet, tortor in blandit viverra, augue tellus laoreet felis, vitae consectetur elit erat id lacus. Phasellus ac bibendum sem. Etiam sit amet efficitur velit, eu sollicitudin lectus. Suspendisse bibendum sem vel quam aliquam, et laoreet dui ultrices. "
    },
    {
        id:43,
        username:"Tester",
        subject:"anser",
        comment: "Consectetur adipiscing elit. Maecenas imperdiet, tortor in blandit viverra, augue tellus laoreet felis, vitae consectetur elit erat id lacus. Phasellus ac bibendum sem. Etiam sit amet efficitur velit, eu sollicitudin lectus. Suspendisse bibendum sem. "
    },
    {
        id:44,
        username:"Tester",
        subject:"subject goes here",
        comment: "This is another comment."
    }    
];

var lastReplyClicked = null;

$(document).ready(function(){

    $("#commentsTarget").on("click", ".reply-btn", onReplyButtonClick);

    //$(".reply-btn").on("click", onReplyButtonClick);

    renderComments(globalComments);
    

    $("#showFormBtn").on("click", onShowFormBtnClick);
    $("#commentForm").on("submit", onCommentFormSubmit);

    $("#replyForm").on("submit", onReplyFormSubmit);
});

function onReplyFormSubmit(event){
    event.preventDefault();

    var formData = {
        id:50,
        username: $("#reply-username").val(),
        subject: $("#reply-subject").val(),
        comment: $("#reply-comment").val(),
    };

    console.log("form data", formData);


    renderSingleComment(formData, lastReplyClicked);

//     var comment = {};
// /*
// 0: {name: "username", value: ""}
// 1: {name: "subject", value: ""}
// 2: {name: "comment", value: ""}
// */
//     $.each(formData, function(index, val){
//         comment[val.name] = val.value;
//     });

//     console.log("packaged form data", comment);

//     renderSingleComment(comment, $("#formColumn"));
}

function onReplyButtonClick(event){
    $('#myModal').modal('show');


    lastReplyClicked = $(this).parents(".comment");

}

function onCommentFormSubmit(event){
    event.preventDefault();

    var formData = $(this).serializeArray();

    console.log("form data", formData);

    var comment = {};
/*
[
    0: {name: "username", value: ""}
    1: {name: "subject", value: ""}
    2: {name: "comment", value: ""}
]
*/
    // for(var x=0;x<formData.length;x++){
    //     var input = formData[x];
    //     comment[input.name] = input.value;
    // }

    $.each(formData, function(index, val){
        comment[val.name] = val.value;
    });

    console.log("packaged form data", comment);

    renderSingleComment(comment, $("#commentsTarget"));
}

function onShowFormBtnClick(event){
    $("#commentForm")  
        .hide()  
        .removeClass("hidden")
        .fadeIn("slow");
}

function renderComments(comments){
    for(var x=0;x<comments.length;x++){
        var comment = comments[x];

        renderSingleComment(comment, $("#commentsTarget"));
    }
}

function renderSingleComment(comment, target){

    //  'programmatic' style of DOM creation
    //  -------------------------------
    // var commentDiv = $("<div>");

    // var idHolder = $("<p>")
    //                 .addClass("comment-id")
    //                 .text(comment.id);

    // commentDiv.append(idHolder);

    //  var userHolder = $("<p>").text(comment.username);
    // commentDiv.append(userHolder);

    // var subjectHolder = $("<p></p>").text(comment.subject);
    // commentDiv.append(subjectHolder);

    // var comHolder = $("<p></p>").text(comment.comment);
    // commentDiv.append(comHolder);

    // target.append(commentDiv);

    //  'clone and append' style of DOM creation
    //  -------------------------------
    var rawTemplate = $("#commentTemplate").html();

    //  console.log("raw template", rawTemplate);

    var clone = $(rawTemplate);

//  console.log("DOM", clone);
    
    $(".comment-id", clone).text(comment.id);
    $("h4", clone).text(comment.subject);
    $("p.content", clone).text(comment.comment);
    $("p.posted-date", clone).text(new Date());

    // $(".reply-btn", clone).on("click", onReplyButtonClick);

    target.append(clone);
}

