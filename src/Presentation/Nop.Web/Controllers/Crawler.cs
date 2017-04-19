using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Text.RegularExpressions;
using System.Net;
using Newtonsoft.Json;
using System.Net.Http;
using Newtonsoft.Json.Linq;

using HtmlAgilityPack;

using System.IO;

using System.Web;


namespace Nop.Admin.Controllers
{
    public class Crawler
    {
        public string crawlerURL;
        public string crawlerClassName;



        public Crawler()
        {

        }


        public Crawler(string passedClassName, string passedURL)
        {
            this.crawlerURL = passedURL;
            this.crawlerClassName = passedClassName;
        }


        public int CrawlPage()
        {
            var matchCount = 0;

            var webGet = new HtmlWeb();

            var document = webGet.Load(crawlerURL);

            var matchesFound = document.DocumentNode.SelectNodes("//*[@class='" + crawlerClassName + "']");

            try
            {
                if (matchesFound.Count > 0)
                {
                    matchCount = 1;
                }
            }
            catch
            {
                matchCount = 0;
            }

            return matchCount;

        }





        public void ModifyDOM(string URL)
        {

            var webGet = new HtmlWeb();

            //var document = webGet.Load("http://www.goprocut.com/knives-tools/0-4065zg-8-ka-bar-dozier-folding-hunter-w-hole-zombie-green.html");
            var document = webGet.Load(URL);

            var body = document.DocumentNode.Descendants().Where(n => n.Name == "body").FirstOrDefault();

            var head = document.DocumentNode.Descendants().Where(n => n.Name == "head").FirstOrDefault();






            //   ADD BOOTSTRAP REF   /////////////////////////////////////////////////////////////////


            if (head != null)
            {

                // < link rel = "stylesheet" href = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" >

                var bootstrapLink = new HtmlNode(HtmlNodeType.Element, document, 0);

                bootstrapLink.Name = "link";

                bootstrapLink.Attributes.Add("rel", "stylesheet");

                bootstrapLink.Attributes.Add("href", "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css");

                head.ChildNodes.Insert(0, bootstrapLink);

            }




            if (body != null)
            {

                //   REMOVE JS ERROR SCRIPT    ///////////////////////////////////////////

                var jscript = document.DocumentNode.Descendants().Where(n => n.Name == "script");

                foreach (HtmlNode node in jscript)
                {
                    var src = node.GetAttributeValue("src", null);
                    string reject = "http://www.goprocut.com/js/prototype/prototype.js";
                    if (src == reject)
                    {
                        node.ParentNode.RemoveChild(node, true);
                        Console.WriteLine("Removed Node");
                        break;
                    }
                }






                //   ADD JQUERY REF  ///////////////////////////////////////////////////////


                var jQueryRef = new HtmlNode(HtmlNodeType.Element, document, 1);

                jQueryRef.Name = "script";

                jQueryRef.Attributes.Add("src", "https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js");

                body.ChildNodes.Insert(1, jQueryRef);









                //  ADD SELECTOR CSS  /////////////////////////////////////////////////////////


                var style = new HtmlNode(HtmlNodeType.Element, document, 2);

                style.Name = "style";

                //style.InnerHtml = ".border { border - style: solid; }.target{ border - style: solid; }";

                style.InnerHtml = ".target{border: solid #5264ea; border-width: 7px; border-radius: 5px;}";

                body.ChildNodes.Insert(2, style);








                //    ADD LISTENERS    ////////////////////////////////////////


                var listeners = new HtmlNode(HtmlNodeType.Element, document, 3);

                listeners.Name = "script";
                //js.InnerHtml = "$(document).ready(function() {$('.entrytext').mouseover(function(event) {$(event.target).addClass('outline-element');}).mouseout(function(event) {$(event.target).removeClass('outline-element');}).click(function(event) {$(event.target).toggleClass('outline-element-clicked');});});";

                listeners.InnerHtml = @"$(document).ready(function(){$(""* :not('div, body, form')"").mouseover(function(){inspectElements(this);});" +
                                      @"$(""* :not('div, body, form')"").mouseout(function(){inspectElements(this);});" +
                                      @"$(""* :not('div, body, form')"").click(function(){post(this);});});";







                body.ChildNodes.Insert(3, listeners);







                ////  ADD JS HIGHLIGHT FUNCTIONS  ///////////////////////////////////////////////////////////////////

                var jsFunctions = new HtmlNode(HtmlNodeType.Element, document, 4);

                jsFunctions.Name = "script";
                //js.InnerHtml = "$(document).ready(function() {$('.entrytext').mouseover(function(event) {$(event.target).addClass('outline-element');}).mouseout(function(event) {$(event.target).removeClass('outline-element');}).click(function(event) {$(event.target).toggleClass('outline-element-clicked');});});";

                jsFunctions.InnerHtml = @"function post(thisElem){var elementName = document.getElementById(""key"").innerHTML;parent.postMessage(elementName, ""*"");}" +
                                        @"function inspectElements(thisElem){if ($(thisElem).hasClass(""skip"")){;}else{clearBorders(thisElem);checkIfTarget(thisElem);}}" +
                                        @"function clearBorders(thisElem){var modifiedElem = document.getElementsByClassName(""target"");if (modifiedElem.length != 0){var node = modifiedElem[0];$(node).removeClass(""target"");highlight(thisElem);}else{highlight(thisElem);}}" +
                                        @"function highlight(thisElem){$(thisElem).addClass(""target"");}" +
                                        @"function bounceOut(){var modifiedElem = document.getElementsByClassName(""target"");if (modifiedElem.length != 0){var node = modifiedElem[0];$(node).removeClass(""target"");}}";




                /*findClassName(thisElem);*/


                body.ChildNodes.Insert(4, jsFunctions);







                /////   CLASS FUNCTIONS      //////////////////////////////////////////////////////////////////////////////////////////////////////////////



                var checkTarget = new HtmlNode(HtmlNodeType.Element, document, 5);

                checkTarget.Name = "script";

                checkTarget.InnerHtml = @"function checkIfTarget(thisElem){var key = document.getElementById(""key"");if (thisElem.classList[0] == ""target""){key.innerHTML = ""(blank)"";}else{findAllClasses(thisElem);}}";

                body.ChildNodes.Insert(5, checkTarget);



                var findClasses = new HtmlNode(HtmlNodeType.Element, document, 6);

                findClasses.Name = "script";

                findClasses.InnerHtml = @"function findAllClasses(thisElem){var key = document.getElementById(""key"");var classes = """";var clist = thisElem.classList;var it = 0;while (clist.length > it){if (it == 0){classes += clist[it];}else if (clist[it] != ""target""){classes += "" "" + clist[it];}it++;}key.innerHTML = classes;}";

                body.ChildNodes.Insert(6, findClasses);














                //   ADD ELEMENT NAME WINDOW    ////////////////////////////////////////////


                var messageElement = new HtmlNode(HtmlNodeType.Element, document, 7);

                messageElement.Name = "div";
                //messageElement.Attributes.Add("style", "width:70%;border:solid black 2px;font-size:xx-large;text-align:center;position:fixed;bottom:0;right:0;z-index:100");
                messageElement.Attributes.Add("style", "width: 550px; height: 65px; border-top: solid #575e68 5px; border-right: solid #575e68 5px; border-top-right-radius: 0.5em; font-size: 22px; position: fixed; bottom: 0; left: 0; z-index: 100; background-color: #e3eaf4;");

                messageElement.Attributes.Add("class", "container");
                messageElement.Attributes.Add("class", "skip");
                messageElement.InnerHtml = @"<div class=""row skip""><div class=""col-md-5 skip"" style=""margin-left: 20px;"">" +
                                           @"<p class=""skip"" style=""color: #41474f; padding-top: 11px; text-align: right;"">Element Name:</p>" +
                                           @"</div><div class=""col-md-6 skip""><p id =""key"" class=""skip"" style=""color: #4959d1; padding-top: 11px; text-align: left;""></p></div></div>";

                body.ChildNodes.Insert(7, messageElement);

            }



            var fileName = string.Format("~/ModifiedPages/{0}.htm", Guid.NewGuid().ToString());

           
            

            document.Save(HttpContext.Current.Server.MapPath("~/Themes/X20/Content/theme/images/ModifiedDoc.html"));

        }







    }
}