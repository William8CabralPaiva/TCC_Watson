using IBM.Cloud.SDK.Core.Authentication.Iam;
using IBM.Watson.ToneAnalyzer.v3;
using IBM.Watson.ToneAnalyzer.v3.Model;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using teste_natural.src;

namespace teste_natural
{
     class ToneAnalizer
    {
        public static  List<Sentimento> Analisador(List<String> frases, List<String> original)
        {
            IamConfig config = new IamConfig(
                apikey: Constantes.TRADUTOR_IBM
             );

            ToneAnalyzerService service = new ToneAnalyzerService("2017-09-21", config);
            service.SetEndpoint("https://gateway.watsonplatform.net/tone-analyzer/api");

            //ToneInput toneInput = new ToneInput()
            //{
            //    Text = texto
            //};
            List<Utterance> ArrayFrases = new List<Utterance>();
            foreach (var f in frases)
            {
                Utterance ut = new Utterance();
                ut.Text = f;
                ArrayFrases.Add(ut);
            }

            var result = service.ToneChat(
                utterances: ArrayFrases,
                acceptLanguage: "pt-br"
            );

            //var result = service.Tone(
            //    toneInput: toneInput,
            //    acceptLanguage:"pt-br"
            //    );
            JObject json = JObject.Parse(result.Response);
            var jsonFilho = json["utterances_tone"];
            string sentimentos = "";
            List<Sentimento> arraySentimentos = new List<Sentimento>();
            int cont_nao_encontrado = 0;
            for (int i = 0; i < jsonFilho.Count(); i++)
            {
                //MessageBox.Show(jsonFilho[i].ToString());
                var tones = jsonFilho[i]["tones"];
                sentimentos = "";
                for (int c = 0; c < tones.Count(); c++)
                {
                    sentimentos += tones[c]["tone_name"] + ",";
                }


                Sentimento sent = new Sentimento();
                if (sentimentos != "")
                    sent.sentimento = sentimentos.Substring(0, sentimentos.Length - 1);
                else
                {
                    sent.sentimento = "Sentimento não encontrado";
                    cont_nao_encontrado++;
                }

                if ((sent.sentimento == "Sentimento não encontrado" && cont_nao_encontrado <=3) || sent.sentimento!= "Sentimento não encontrado")
                {
                    string limparstring = Regex.Replace(original[i], @"http[^\s]+", "");
                    sent.frase = limparstring;
                    

                    arraySentimentos.Add(sent);
                }
                //MessageBox.Show(original[i]+""+sentimentos.Substring(0,sentimentos.Length-1));     
            }
            return arraySentimentos;
            // Console.WriteLine(result.Response);
        }
    }
}
