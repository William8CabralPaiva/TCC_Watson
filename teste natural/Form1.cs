using IBM.Cloud.SDK.Core.Authentication.Iam;
using IBM.Watson.LanguageTranslator.v3;
using IBM.Watson.ToneAnalyzer.v3;
using IBM.Watson.ToneAnalyzer.v3.Model;
using MaterialSkin;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;
using teste_natural.src;
using Tweetinvi;

namespace teste_natural
{
    public partial class Twitter : MaterialSkin.Controls.MaterialForm
    {
        public Twitter()
        {
            InitializeComponent();

            var materialSkinManager = MaterialSkinManager.Instance;
            materialSkinManager.AddFormToManage(this);
            materialSkinManager.Theme = MaterialSkinManager.Themes.LIGHT;
           var cores= new ColorScheme(
                Primary.Blue800, Primary.Red800,
                Primary.Red800, Accent.LightBlue200,
                TextShade.WHITE
            );
           
            materialSkinManager.ColorScheme = new ColorScheme(Primary.Blue300, Primary.Blue500, Primary.Blue500, Accent.LightBlue200, TextShade.WHITE);

            src.Twitter.Credenciais();
            //btn_enviar.BackColor = Color.FromArgb(55, 71, 79);

        }

        private void Form1_Load(object sender, EventArgs e)
        {

            /*List<String> frases = new List<String>();
            frases.Add("para caramba você tem problema");
            frases.Add("eu to feliz");
            frases.Add("eu to triste");
            frases.Add("eu to bravo");
            frases.Add("eu to com sono");
            frases.Add("eu to com fome");
            frases.Add("");

            if(BLL.valida(ref frases))
            {
                var resp = IBMTranslator.Tradutor(frases);
                var sent = ToneAnalizer.Analisador(resp, frases);

                foreach (var item in sent)
                {
                    MessageBox.Show(item.frase + "(" + item.sentimento + ")");
                }
            }
            else
            {
                MessageBox.Show("nao pode executar");
            }
            */
        }

        private void textBox1_KeyPress(object sender, KeyPressEventArgs e)
        {
            if ((Keys)e.KeyChar == Keys.Enter && btn_enviar.Enabled ==true)
            {
                executabotao();
               
            }
        }

        private void btn_enviar_Click(object sender, EventArgs e)
        {
            if (btn_enviar.Enabled)
            {
                executabotao();
            }

        }

        void Executa()
        {
            if (BLL.validaEntrada(textBox1.Text))
            {
                var tweets = src.Twitter.Twetts(textBox1.Text);
                if (BLL.valida(ref tweets))
                {
                    var resp = IBMTranslator.Tradutor(tweets);
                    var sent = ToneAnalizer.Analisador(resp, tweets);

                    criaPaineis(sent);
                }
                else
                {
                    MessageBox.Show("Usuário não Encontrado", "Aviso");
                    this.Invoke((MethodInvoker)delegate ()
                    {
                        panel1.Controls.Clear();
                        textBox1.Focus();
                    });

                }

            }
            else
            {
                MessageBox.Show("Não Digite valores nulos", "Aviso");
                this.Invoke((MethodInvoker)delegate ()
                {
                    panel1.Controls.Clear();
                     textBox1.Focus();
                });
            }
            this.Invoke((MethodInvoker)delegate ()
            {
                textBox1.Text = "";
                btn_enviar.Text = "ENVIAR";
                btn_enviar.BackColor = Color.FromArgb(33, 150, 243);
                btn_enviar.Enabled = true;
                pictureBox1.Visible = false;
                textBox1.Enabled = true;
                textBox1.Focus();
               
            });
        }

        void criaPaineis(List<Sentimento> sent)
        {
            this.Invoke((MethodInvoker)delegate ()
            {
                panel1.Controls.Clear();
            });
            Label author, frase;
            Panel painel;
            int y = 10;
            string teste = "Cinco patinhos. Foram passear. Além das montanhas. Para brincar. A mamãe gritou. Quack quack quack quack. Mas só quatro patinhos. Voltaram de lá. . Quatro patinhos. Foram passear. Além das montanhas. Para brincar. A mamãe gritou. Quack quack quack quack. Mas só três patinhos.";
            foreach (var item in sent)
            {
                painel = new Panel();
                painel.BackColor =  Color.FromArgb(30, 144, 255);
                painel.Location = new Point(10, y);
                painel.Size = new Size(panel1.Size.Width - 50, 150);
                
                


                author = new Label();
                author.ForeColor = Color.White;
                author.Location = new Point(10, 10);
                author.Font = new Font("Cambria", 12);
                author.Text = "@" + textBox1.Text;
                author.Size = new Size(painel.Size.Width - 35, author.Size.Height);
                




                frase = new Label();
                frase.Font=new Font("Cambria", 12);
                frase.ForeColor = Color.White;
                frase.Location = new Point(20, 35);
                frase.Size = new Size(painel.Size.Width-35, painel.Size.Height);
                //frase.Text = teste;
                frase.Text = item.frase + "(" + item.sentimento + ")";
                this.Invoke((MethodInvoker)delegate ()
                {
                    panel1.Controls.Add(painel);
                    painel.Controls.Add(author);
                    painel.Controls.Add(frase);
                });
                

                y += 180;
            }
        }

        void executabotao()
        {
            btn_enviar.BackColor = Color.FromArgb(33, 150, 243);
            pictureBox1.Visible = true;
   
            textBox1.Enabled = false;
            btn_enviar.Text = "CARREGANDO...";
            btn_enviar.Enabled = false;
            Thread t1 = new Thread(new ThreadStart(Executa));
            t1.Start();
            
        }

        private void button1_Click(object sender, EventArgs e)
        {

        }

        private void textBox1_TextChanged(object sender, EventArgs e)
        {

        }
    }

}
