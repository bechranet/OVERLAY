
//Called when application is started.
function OnStart()
{
//Create a layout with objects vertically centered.
lay = app.CreateLayout( "linear", "VCenter,FillXY" );
//Create a toggle button.
tgl = app.CreateToggle( "Show Chat Head", 0.4, 0.1 );
tgl.SetOnTouch( tgl_OnTouch );
lay.AddChild( tgl );
//lay.Gone(); //<<<<<<<<<<

//Add layout to app.
app.AddLayout( lay );

//Create Overlay control.
ovl = app.CreateOverlay();

//Create chat head layout.
layHead = app.CreateLayout( "Absolute" );

//Create chat head image.
imgHead = app.CreateImage( "/Sys/Img/Hello.png", 0.2 );
imgHead.SetOnTouch( img_OnTouch );
layHead.AddChild( imgHead );

//Set the initial position of the head.
chatLeft = 0.1; chatTop = 0.1;
//>>>>>>>>>>
ovl.AddLayout( layHead, chatLeft, chatTop );
//ovl.AddLayout( layHead, chatLeft, chatTop );
app.ToBack();
//<<<<<<<<<<
}

//Called when user touches our button.
function tgl_OnTouch( isChecked )
{
//Add chat head layout to overlay.
if( isChecked ) ovl.AddLayout( layHead, chatLeft, chatTop );
else ovl.RemoveLayout( layHead );
}

//Handle chat head image touches.
function img_OnTouch( ev )
{
if( ev.action=="Down" )
{
//Store chat head start position.
headX = chatLeft; headY = chatTop;

//Store finger down start position.
startX = ev.screenX; startY = ev.screenY;
dx = 0; dy = 0;
}
else if( ev.action=="Move" )
{
//Calculate distance moved by finger.
dx = ev.screenX - startX;
dy = ev.screenY - startY;

//Move chat head layout.
chatLeft = headX+dx; chatTop = headY+dy;
ovl.SetPosition( layHead, chatLeft, chatTop )
}
else if( ev.action=="Up" )
{
if( Math.abs(dx) < 0.001 )
app.ShowPopup( "Hello" )
}
}
//>>>>>>>>>>
function OnResume()
{
lay.Show();
}
//<<<<<<<<<<