var globalComments = [
    {
        id:42,
        username:"Codor",
        subject:"Hello?",
        comment: "YEEEET Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas imperdiet, tortor in blandit viverra, augue tellus laoreet felis, vitae consectetur elit erat id lacus. Phasellus ac bibendum sem. Etiam sit amet efficitur velit, eu sollicitudin lectus. Suspendisse bibendum sem vel quam aliquam, et laoreet dui ultrices. "
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



$(document).ready(function(){

    renderComments(globalComments);

    //$("#showFormBtn").click(onShowFormBtnClick);
    $("#showFormBtn").on("click", onShowFormBtnClick);
    $("#commentForm").on("submit", onCommentFormSubmit);  
});

function onCommentFormSubmit(event){
    event.preventDefault();

    var formData = $(this).serializeArray();

    console.log("form data", formData);

    var comment = {};
/*
0: {name: "username", value: ""}
1: {name: "subject", value: ""}
2: {name: "comment", value: ""}
*/
    $.each(formData, function(index, val){
        comment[val.name] = val.value;
    });

    console.log("packaged form data", comment);

    renderSingleComment(comment, $("#formColumn"));
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
    // var commentDiv = $("<div></div>");

    // var idHolder = $("<p></p>").text(comment.id);
    // commentDiv.append(idHolder);

    // var userHolder = $("<p></p>").text(comment.username);
    // commentDiv.append(userHolder);

    // var subjectHolder = $("<p></p>").text(comment.subject);
    // commentDiv.append(subjectHolder);

    // var comHolder = $("<p></p>").text(comment.comment);
    // commentDiv.append(comHolder);

    // target.append(commentDiv);

    //  'clone and append' style of DOM creation
    //  -------------------------------
    var rawTemplate = $("#commentTemplate").html();

    var clone = $(rawTemplate);
    $(".comment-id", clone).text(comment.id);
    $("h4", clone).text(comment.subject);
    $("p.content", clone).text(comment.comment);
    $("p.posted-date", clone).text(new Date());

    target.append(clone);
}

